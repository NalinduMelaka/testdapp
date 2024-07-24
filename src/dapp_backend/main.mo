import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Types "types";
import Iter "mo:base/Iter";
import D "mo:base/Debug";
import Text "mo:base/Text";
import Buffer "mo:base/Buffer";
import Nat "mo:base/Nat";
import Bool "mo:base/Bool";
import Array "mo:base/Array";
import Region "mo:base/Region";
import Server "mo:server";
import Assets "mo:assets";
import T "mo:assets/Types";
import Random "mo:base/Random";

shared ({ caller = creator }) actor class () {
  type Request = Server.Request;
  type Response = Server.Response;
  type HttpRequest = Server.HttpRequest;
  type HttpResponse = Server.HttpResponse;
  type ResponseClass = Server.ResponseClass;

   stable var serializedEntries : Server.SerializedEntries = ([], [], [creator]);

  var server = Server.Server({ serializedEntries });

  let assets = server.assets;

  server.post(
    "/greet",
    func(req : Request, res : ResponseClass) : async Response {
      let parsedName = req.url.queryObj.get("name");
      var name = "";
      switch parsedName {
        case null { name := "World" };
        case (?n) {
          name := n;
        };
      };
      let greeting = "Hello " # name # "!";
      res.send({
        status_code = 200;
        headers = [("Content-Type", "text/plain")];
        body = Text.encodeUtf8(greeting);
        streaming_strategy = null;
        cache_strategy = #default;
      });
    },
  );
  
   server.post(
    "/key",
    func(req : Request, res : ResponseClass) : async Response {
      let parsedName = req.url.queryObj.get("apikey");
      var apikey = "";
      switch parsedName {
        case null { apikey := "invalied" };
        case (?n) {
          apikey := n;
        };
      };
      let greeting = "is valied " # apikey # "!";
      res.send({
        status_code = 200;
        headers = [("Content-Type", "text/plain")];
        body = Text.encodeUtf8(greeting);
        streaming_strategy = null;
        cache_strategy = #default;
      });
    },
  );
    server.get("/list", func(req : Request, res : ResponseClass) : async Response {
        res.send({
            status_code = 200;
            headers = [("Content-Type", "text/plain")];
            body = Text.encodeUtf8("Hello, world!");
            streaming_strategy = null;
            cache_strategy = #default;
        });
    });

    server.get("/medications", func(req : Request, res : ResponseClass) : async Response {
        res.send({
            status_code = 200;
            headers = [("Content-Type", "text/plain")];
            body =  "{ \"medication1\": \"panadol\", \"medication2\": \"paracetamol\" }";
            streaming_strategy = null;
            cache_strategy = #default;
        });
    });
     server.get("/users", func(req : Request, res : ResponseClass) : async Response {
        res.send({
            status_code = 200;
            headers = [("Content-Type", "text/plain")];
            body =  "{ \"hello\": \"world\" }";
            streaming_strategy = null;
            cache_strategy = #default;
        });
    });

  server.get(
    "/foo",
    func(req : Request, res : ResponseClass) : async Response {
      res.send({
        status_code = 200;
        headers = [("Content-Type", "text/html")];
        body = Text.encodeUtf8("<html><body><h1>Foo</h1></body></html>");
        streaming_strategy = null;
        cache_strategy = #default;
      });
    },
  );

  public shared ({ caller }) func authorize(other : Principal) : async () {
    server.authorize({
      caller;
      other;
    });
  };

  public query func retrieve(path : Assets.Path) : async Assets.Contents {
    assets.retrieve(path);
  };

  public shared ({ caller }) func store(
    arg : {
      key : Assets.Key;
      content_type : Text;
      content_encoding : Text;
      content : Blob;
      sha256 : ?Blob;
    }
  ) : async () {
    server.store({
      caller;
      arg;
    });
  };

  public query func list(arg : {}) : async [T.AssetDetails] {
    assets.list(arg);
  };

  public query func get(
    arg : {
      key : T.Key;
      accept_encodings : [Text];
    }
  ) : async ({
    content : Blob;
    content_type : Text;
    content_encoding : Text;
    total_length : Nat;
    sha256 : ?Blob;
  }) {
    assets.get(arg);
  };

  public shared ({ caller }) func create_batch(arg : {}) : async ({
    batch_id : T.BatchId;
  }) {
    assets.create_batch({
      caller;
      arg;
    });
  };

  public shared ({ caller }) func create_chunk(
    arg : {
      batch_id : T.BatchId;
      content : Blob;
    }
  ) : async ({
    chunk_id : T.ChunkId;
  }) {
    assets.create_chunk({
      caller;
      arg;
    });
  };

  public shared ({ caller }) func commit_batch(args : T.CommitBatchArguments) : async () {
    assets.commit_batch({
      caller;
      args;
    });
  };

  public shared ({ caller }) func create_asset(arg : T.CreateAssetArguments) : async () {
    assets.create_asset({
      caller;
      arg;
    });
  };

  public shared ({ caller }) func set_asset_content(arg : T.SetAssetContentArguments) : async () {
    assets.set_asset_content({
      caller;
      arg;
    });
  };

  public shared ({ caller }) func unset_asset_content(args : T.UnsetAssetContentArguments) : async () {
    assets.unset_asset_content({
      caller;
      args;
    });
  };

  public shared ({ caller }) func delete_asset(args : T.DeleteAssetArguments) : async () {
    assets.delete_asset({
      caller;
      args;
    });
  };

  public shared ({ caller }) func clear(args : T.ClearArguments) : async () {
    assets.clear({
      caller;
      args;
    });
  };

  public type StreamingStrategy = {
    #Callback : {
      callback : shared query StreamingCallbackToken -> async StreamingCallbackHttpResponse;
      token : StreamingCallbackToken;
    };
  };

  public type StreamingCallbackToken = {
    key : Text;
    content_encoding : Text;
    index : Nat;
    sha256 : ?Blob;
  };

  public type StreamingCallbackHttpResponse = {
    body : Blob;
    token : ?StreamingCallbackToken;
  };

  public query func http_request_streaming_callback(token : T.StreamingCallbackToken) : async StreamingCallbackHttpResponse {
    assets.http_request_streaming_callback(token);
  };
  public query func http_request(req : HttpRequest) : async HttpResponse {
    server.http_request(req);
  };
  public func http_request_update(req : HttpRequest) : async HttpResponse {
    await server.http_request_update(req);
  };

  /**
    * upgrade hooks
    */
  system func preupgrade() {
    serializedEntries := server.entries();
  };

  system func postupgrade() {
    ignore server.cache.pruneAll();
  };

  //untill from the mail api code

  type Patient = {
    firstname : Text;
    lastname : Text;
    phone : Text;
    id : Text;
  };

  type Doctor = {
    firstname : Text;
    lastname : Text;
    phone : Text;
    medicallicence : Text;
  };

  type Pharma = {
    firstname : Text;
    lastname : Text;
    phone : Text;
    slmcregno : Text;
  };

   type APIuser = {
    firstname : Text;
    lastname : Text;
    phone : Text;
    id : Text;
  };

  type User = {
    #patient : Patient;
    #doctor : Doctor;
    #pharma : Pharma;
    #apiuser: APIuser;
  };

  type Medication = {
    drugname : Text;
    status : Text;
    dose : Text;
    note : Text;
    reason : Text;
    picture : Text;
    prescriber : Text;
    timestamp : Nat;
  };

  type Prescription = {
    conform: Bool;
    status: Text;
    prescriber: Text;
    dose: [Text];
    note: Text;
    reason: Text;
    timestamp: Nat;
    medications: [Text];
  };

  type Appointment = {
    patientId : Text;
    doctorId : Text;
    date : Text;
    time : Text;
    reason : Text;
  };
type Care = {
    care: Text;
    street: Text;
    number: Text;
    zip: Text;
    box: Text;
    town: Text;
    state: Text;
    country: Text;
    phone: Text;
    email: Text;
    comment: Text;
    timestamp: Nat;
};

type Emergency = {
  relation: Text;
  name: Text;
  phone: Text;
  phone2: Text;
  email: Text;
  street: Text;
  number: Text;
  zip: Text;
  box: Text;
  town: Text;
  state: Text;
  country: Text;
  comment: Text;
  timestamp: Nat;
};

type Provider = {
  matterdomain: Text;
  street: Text;
  number: Text;
  zip: Text;
  box: Text;
  town: Text;
  state: Text;
  country: Text;
  phone: Text;
  mobile: Text;
  email: Text;
  comment: Text;
  timestamp: Nat;
};

type Contact = {
  #care: Care;
  #emergency: Emergency;
  #provider: Provider;
  };
  type PharmaWithPrincipal = {
    principal : Principal;
    pharma : Pharma;
  };

  type ApIkey = {
    apikey : Text;
    timestamp: Nat;
  };

  type Consent = {
 prescription: Bool;
 medication: Bool;
 appointment: Bool;
 contacts: Bool;
  };

  type Result<Ok, Err> = Types.Result<Ok, Err>;
  type HashMap<K, V> = Types.HashMap<K, V>;

  let members = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  let patientIds = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
  let apiuserIds = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
  let medicines = HashMap.HashMap<Principal, Buffer.Buffer<Medication>>(0, Principal.equal, Principal.hash);
  //for the contacts
  let contacts = HashMap.HashMap<Principal, Buffer.Buffer<Contact>>(0, Principal.equal, Principal.hash);
  //for the consent
  let consent = HashMap.HashMap<Principal, Consent>(0, Principal.equal, Principal.hash);
  //for the api keys
  let apikeys = HashMap.HashMap<Principal, Buffer.Buffer<ApIkey>>(0, Principal.equal, Principal.hash);
  //for pharamsists to keep medications
  let phamamedilist = HashMap.HashMap<Principal, Buffer.Buffer<PharmaWithPrincipal>>(0, Principal.equal, Principal.hash);
  let prescriptions = HashMap.HashMap<Principal, Buffer.Buffer<Prescription>>(0, Principal.equal, Principal.hash);
  //for doctors
  let doctorLicences = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
  let appointments = HashMap.HashMap<Text, Buffer.Buffer<Appointment>>(0, Text.equal, Text.hash);



  //check all principlas testing purpose
  public shared query func getAllPrincipals() : async [Principal] {
    let principals = Iter.toArray(members.keys());
    return principals;
  };

  public shared query func getPatients() : async [Patient] {
    let patientsBuffer = Buffer.Buffer<Patient>(1);
    for ((principal, user) in members.entries()) {
      switch (user) {
        case (#patient(patient)) {
          patientsBuffer.add(patient);
        };
        case (_) {};
      };
    };
    return Buffer.toArray(patientsBuffer);
  };
 
  
public shared query func getTopPharmas(slmcRegNoPrefix : ?Text) : async [(Text, Text)] {
  for ((principal, user) in members.entries()) {
    switch (user) {
      case (#pharma(pharma)) {
        if (?pharma.slmcregno == slmcRegNoPrefix) {
          // Return an array with the exact match
          return [(pharma.firstname, pharma.slmcregno)];
        };
      };
      case (_) {};
    };
  };
  // Return an empty array if no exact match is found
  return [];
};



  public shared query func getPharmacists() : async [PharmaWithPrincipal] {
    let pharmacistsBuffer = Buffer.Buffer<PharmaWithPrincipal>(1);
    for ((principal, user) in members.entries()) {
      switch (user) {
        case (#pharma(pharma)) {
          let pharmaWithPrincipal : PharmaWithPrincipal = {
            principal = principal;
            pharma = pharma;
          };
          pharmacistsBuffer.add(pharmaWithPrincipal);
        };
        case (_) {};
      };
    };
    Buffer.toArray(pharmacistsBuffer);
  };


  // Function to add a medication record for a user
  public shared ({ caller }) func addMedication(med : Medication) : async Result<(), Text> {
    // Find or create the buffer for the user's medications
    let medsBuffer = switch (medicines.get(caller)) {
      case (null) {
        // If the user does not exist, create a new buffer
        let newBuffer = Buffer.Buffer<Medication>(1);
        medicines.put(caller, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        // If the user exists, use the existing buffer
        buffer;
      };
    };
    // Add the new medication to the buffer
    medsBuffer.add(med);
    return #ok();
  };



  //function to add API key records for user
  public shared ({ caller }) func addApikey(apikey : ApIkey) : async Result<(), Text> {
    let apikeyBuffer = switch (apikeys.get(caller)) {
      case (null) {
        // If the user does not exist, create a new buffer
        let newBuffer = Buffer.Buffer<ApIkey>(1);
        apikeys.put(caller, newBuffer);
        newBuffer;
        };
        case (?buffer) {
          // If the user exists, use the existing buffer
          buffer;
          };
          };
          // Add the new medication to the buffer
          apikeyBuffer.add(apikey);
          return #ok();
    

  };

  //function to delte API key records for user


//function to add prescripiton for doctors after they can select the users
public shared ({caller}) func addprescriptionfordoc(prescription : Prescription) : async Result<(), Text> {
  let medsBuffer = switch (prescriptions.get(caller)) {
      case (null) {
        // If the user does not exist, create a new buffer
        let newBuffer = Buffer.Buffer<Prescription>(1);
        prescriptions.put(caller, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        // If the user exists, use the existing buffer
        buffer;
      };
    };
    // Add the new medication to the buffer
    medsBuffer.add(prescription);
    return #ok();
};
  //Function to add a medication record for phamasist hashmap
  public shared  func addMedicationphama(med : PharmaWithPrincipal, p: Principal) : async Result<(), Text> {
    // Find or create the buffer for the user's medications
    let medsBuffer = switch (phamamedilist.get(p)) {
      case (null) {
        // If the user does not exist, create a new buffer
        let newBuffer = Buffer.Buffer<PharmaWithPrincipal>(1);
        phamamedilist.put(p, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        // If the user exists, use the existing buffer
        buffer;
      };
    };
    // Add the new medication to the buffer
    medsBuffer.add(med);
    return #ok();
  };

  //Function to add prescription record for a user
  public shared func addPrescription(pri: Principal, pres: Prescription): async Result<(), Text>{
   //Find created the buffer for user
   let medsBuffer = switch (prescriptions.get(pri)) {
      case (null) {
        // If the user does not exist, create a new buffer
        let newBuffer = Buffer.Buffer<Prescription>(1);
        prescriptions.put(pri, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        // If the user exists, use the existing buffer
        buffer;
      };
    };
    // Add the new medication to the buffer
    medsBuffer.add(pres);
    return #ok();
  };

  // Function to get a user's medication list as an array
  public shared query ({ caller }) func getMedicationList() : async Result<[Medication], Text> {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = medicines.get(caller);

    switch (medsBufferOpt) {
      case (null) {
        return #err("User not found.");
      };
      case (?medsBuffer) {
        return #ok(Buffer.toArray(medsBuffer));
      };

    };
  };
  
  // Function to get the count of prescriptions for the caller
  public shared query ({ caller }) func getPrescriptionCount() : async Nat {
    // Retrieve the buffer for the user's prescriptions
    let presBufferOpt = prescriptions.get(caller);

    switch (presBufferOpt) {
      case (null) {
        return 0;
      };
      case (?presBuffer) {
        return presBuffer.size();
      };
    };
  };

  // Function to get the count of medications for the caller
  public shared query ({ caller }) func getMedicationCount() : async Nat {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = medicines.get(caller);

    switch (medsBufferOpt) {
      case (null) {
        return 0;
      };
      case (?medsBuffer) {
        return medsBuffer.size();
      };
    };
  };



  //function to get the contact list as an array
  public shared query ({caller}) func getContacts(): async Result<[Contact], Text>{
    let contactBufferOpt = contacts.get(caller);

    switch(contactBufferOpt){
       case (null) {
        return #err("User not found.");
      };
      case (?conBuffer) {
        return #ok(Buffer.toArray(conBuffer));
      };
    }
  };
  
  //function to get medication list for a specific phamasics
  public shared query ({ caller }) func getMedicationListforphama() : async Result<[PharmaWithPrincipal], Text> {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = phamamedilist.get(caller);

    switch (medsBufferOpt) {
      case (null) {
        return #err("User not found.");
      };
      case (?medsBuffer) {
        return #ok(Buffer.toArray(medsBuffer));
      };

    };
  };

  //Function to get a user's prescription list as an array
  public shared query ({ caller}) func getPrescriptionList(): async Result<[Prescription], Text> {
    //Retrieve the buffer for the users's prescriptions

    let presBufferOpt = prescriptions.get(caller);

    switch(presBufferOpt){
      case (null){
        return #err("user not found.");
      };
      case (?presBuffe){
        return #ok(Buffer.toArray(presBuffe));
      };
    };

  };
 

 //function to get user's AP keys list as array
  public shared query ({ caller }) func getAPIKeyList() : async Result<[ApIkey], Text> {
    let apiKeyBufferOpt = apikeys.get(caller);
    switch (apiKeyBufferOpt) {
      case null {
        return #err("User not found.");
      };
      case (?apiKeyBuffer) {
        return #ok(Buffer.toArray(apiKeyBuffer));
      };
    };
  };

  
  //Functions to get a specific medication
  public shared query ({caller}) func getmedication(ind: Nat): async Result<Medication, Text>{
     // Retrieve the buffer for the user's medications
    let medsBufferOpt = medicines.get(caller);
     switch (medsBufferOpt) {
      case (null) {
        return #err("User not found.");
      };
      case (?medsBuffer) {
                if (ind < medsBuffer.size()) {
                    return #ok(medsBuffer.get(ind));
                } else {
                    return #err("Index out of bounds.");
                }
            };

    };
  };

  //function to get a specific contact based on id
  public shared query ({ caller }) func getContactid(id : Nat) : async Result<Contact, Text> {
      let contactsBufferOpt = contacts.get(caller);
      switch (contactsBufferOpt) {
        case (null) {
          return #err("User not found.");
        };
        case (?contactsBuffer) {
          if (id < contactsBuffer.size()) {
            return #ok(contactsBuffer.get(id));
          }else{
             return #err("Index out of bounds.");
          }
         
        };
      };
    };

    //function to get a specific prescriptipn based on id
  public shared query ({ caller }) func getPrescriptionId(id : Nat) : async Result<Prescription, Text> {
    let prescriptionBufferOpt = prescriptions.get(caller);
    switch (prescriptionBufferOpt) {
      case (null) {
        return #err("user not found");
      };
      case (?prescriptionBuffer) {
        if (id < prescriptionBuffer.size()) {
          return #ok(prescriptionBuffer.get(id));
        } else {
          return #err("index out of bounds");
        };
      };
    };
  };

  //function to get a specific medication
  public shared query ({caller}) func getmedicationforpha(ind: Nat): async Result<PharmaWithPrincipal, Text>{
    //retrieve the buffer for the phama's medicaitons
    let medsBufferOpt = phamamedilist.get(caller);
    switch(medsBufferOpt){
      case (null) {
        return #err("user not found");

      };
      case(?medsBuffer){
        if(ind < medsBuffer.size()){
        
                    return #ok(medsBuffer.get(ind));
                } else {
                    return #err("Index out of bounds.");
                }
      }
    };
  };

  // Function to update a medication record for a user by index

public shared ({ caller }) func updateMedication(index : Nat, updatedMed : Medication) : async Result<(), Text> {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = medicines.get(caller);

    switch (medsBufferOpt) {
        case (null) {
            // If the user does not exist, return an error
            return #err("User not found.");
        };
        case (?medsBuffer) {
            // If the user exists, check if the index is within bounds
            if (index < medsBuffer.size()) {
                // If the index is valid, update the medication at that index
                medsBuffer.put(index, updatedMed);
                return #ok();
            } else {
                // If the index is out of bounds, return an error
                return #err("Invalid index.");
            };
        };
    };
};

//function to update specifc prescription
  public shared ({ caller }) func updatePrescription(index : Nat, updatedPrescription : Prescription) : async Result<(), Text> {
    // Retrieve the buffer for the user's prescriptions
    let prescriptionsBufferOpt = prescriptions.get(caller);

    switch (prescriptionsBufferOpt) {
        case (null) {
            // If the user does not exist, return an error
            return #err("User not found.");
        };
        case (?prescriptionsBuffer) {
            // If the user exists, check if the index is within bounds
            if (index < prescriptionsBuffer.size()) {
                // If the index is valid, update the prescription at that index
                prescriptionsBuffer.put(index, updatedPrescription);
                return #ok();
            } else {
                // If the index is out of bounds, return an error
                return #err("Invalid index.");
            };
        };
    };
};



//function to update specific contact
  public shared ({ caller }) func updateContact(index : Nat, updatedContact : Contact) : async Result<(), Text> {
    // Retrieve the buffer for the user's contacts
    let contactsBufferOpt = contacts.get(caller);

    switch (contactsBufferOpt) {
        case (null) {
            // If the user does not exist, return an error
            return #err("User not found.");
        };
        case (?contactsBuffer) {
            // If the user exists, check if the index is within bounds
            if (index < contactsBuffer.size()) {
                // If the index is valid, update the contact at that index
                contactsBuffer.put(index, updatedContact);
                return #ok();
            } else {
                // If the index is out of bounds, return an error
                return #err("Invalid index.");
            };
        };
    };
};


  // Function to delete a medication record for a user by index
  public shared ({ caller }) func deleteMedicationAtIndex(indexToDelete : Nat) : async Result<(), Text> {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = medicines.get(caller);

    switch (medsBufferOpt) {
      case (null) {
        // If the user does not exist, return an error
        return #err("User not found.");
      };
      case (?medsBuffer) {
        // If the user exists, check if the index is within bounds
        if (indexToDelete < medsBuffer.size()) {
          // If the index is valid, remove the medication at that index
          let _ = medsBuffer.remove(indexToDelete);

          return #ok();
        } else {
          // If the index is out of bounds, return an error
          return #err("Invalid index.");
        };
      };
    };
  };

 // function to delete a specific API key
  public shared ({ caller }) func deleteAPIAtIndex(indexToDelete : Nat) : async Result<(), Text> {
    // Retrieve the buffer for the user's medications
    let medsBufferOpt = apikeys.get(caller);

    switch (medsBufferOpt) {
      case (null) {
        // If the user does not exist, return an error
        return #err("User not found.");
      };
      case (?medsBuffer) {
        // If the user exists, check if the index is within bounds
        if (indexToDelete < medsBuffer.size()) {
          // If the index is valid, remove the medication at that index
          let _ = medsBuffer.remove(indexToDelete);

          return #ok();
        } else {
          // If the index is out of bounds, return an error
          return #err("Invalid index.");
        };
      };
    };
  };

// function to delete a specific prescription
  public shared ({ caller }) func deletePrescriptionAtIndex(indexToDelete : Nat) : async Result<(), Text> {
    // Retrieve the buffer for the user's medications
    let presBufferOpt = prescriptions.get(caller);

    switch (presBufferOpt) {
      case (null) {
        // If the user does not exist, return an error
        return #err("User not found.");
      };
      case (?presBuffer) {
        // If the user exists, check if the index is within bounds
        if (indexToDelete < presBuffer.size()) {
          // If the index is valid, remove the medication at that index
          let _ = presBuffer.remove(indexToDelete);

          return #ok();
        } else {
          // If the index is out of bounds, return an error
          return #err("Invalid index.");
        };
      };
    };
  };


  //functio to delete a contact at specific index
  public shared ({ caller }) func deleteContactAtIndex(indexToDelete : Nat) : async Result<(), Text> {
     // Retrieve the buffer for the user's contacts
     let contactsBufferOpt = contacts.get(caller);
 
     switch (contactsBufferOpt) {
       case (null) {
         // If the user does not exist, return an error
         return #err("User not found.");
       };
       case (?contactsBuffer) {
         // If the user exists, check if the index is within bounds
         if (indexToDelete < contactsBuffer.size()) {
           // If the index is valid, remove the contact at that index
           let _ = contactsBuffer.remove(indexToDelete);
 
           return #ok();
         } else {
           // If the index is out of bounds, return an error
           return #err("Invalid index.");
         };
       };
     };
   };

  // Function to delete a medication record from the pharmaMedList by index
    public shared ({ caller }) func deletePharmaMedAtIndex(indexToDelete : Nat) : async Result<(), Text> {
      // Retrieve the buffer for the pharmaMedList
      let pharmaMedListBufferOpt = phamamedilist.get(caller);
  
      switch (pharmaMedListBufferOpt) {
        case (null) {
          // If the user does not exist, return an error
          return #err("User not found.");
        };
        case (?pharmaMedListBuffer) {
          // If the user exists, check if the index is within bounds
          if (indexToDelete < pharmaMedListBuffer.size()) {
            // If the index is valid, remove the medication at that index
            let _ = pharmaMedListBuffer.remove(indexToDelete);
  
            return #ok();
          } else {
            // If the index is out of bounds, return an error
            return #err("Invalid index.");
          };
        };
      };
    };
  
  //for the patients
  public shared ({ caller }) func createPatientIdMapping(id : Text) : async Result<(), Text> {
    switch (patientIds.get(id)) {
      case (null) {
        let principal = caller;
        patientIds.put(id, principal);
        return #ok();
      };
      case (?oldmemeber) {
        D.print(debug_show (caller));
        return #err("This id is already associated with a member profile.");
      };
    };

  };

  //for the api user id map
  public shared ({ caller }) func createApiuserIdMapping(id : Text) : async Result<(), Text> {
    switch (apiuserIds.get(id)) {
      case (null) {
        let principal = caller;
        apiuserIds.put(id, principal);
        return #ok();
      };
      case (?oldmemeber) {
        D.print(debug_show (caller));
        return #err("This id is already associated with a member profile.");
      };
    };

  };

  public shared ({ caller }) func createDoctorLicenceMapping(licence : Text) : async Result<(), Text> {
    switch (doctorLicences.get(licence)) {
      case (null) {
        let principal = caller;
        doctorLicences.put(licence, principal);
        return #ok();
      };
      case (?oldmember) {
        return #err("This licence is already associated with a doctor profile.");
      };
    };
  };

  public shared ({ caller }) func addMember(member : User) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {

        members.put(caller, member);
        return #ok();
      };
      case (?oldmemeber) {
        D.print(debug_show (caller));
        return #err("This principal is already associated with a member profile.");
      };
    };
  };

//Function for add contacts to the list
  public shared ({ caller }) func addContact(data : Contact) : async Result<(), Text> {
    let conBuffer = switch (contacts.get(caller)) {
      case (null) {
        let newBuffer = Buffer.Buffer<Contact>(1);
        contacts.put(caller, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        buffer;
      };
    };
    conBuffer.add(data);
    return #ok();
  };

  public shared query ({ caller }) func getMember() : async Result<User, Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("There is no memeber associated with this Principal");
      };
      case (?member) {
        return #ok(member);
      };
    };
  };

  public shared ({ caller }) func updateMember(member : User) : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("There is no memeber profile associated with your principal");
      };
      case (?oldmember) {
        members.put(caller, member);
        return #ok();
      };
    };
  };
  public query func getAllMembers() : async [User] {
    let iterator = members.vals();
    return Iter.toArray(iterator);
  };

  public query func numberOfMembers() : async Nat {
    return members.size();
  };

  public shared ({ caller }) func removeMember() : async Result<(), Text> {
    switch (members.get(caller)) {
      case (null) {
        return #err("there is no member associalted with the principle");
      };
      case (?member) {
        members.delete(caller);
        return #ok();
      };
    };
  };

  public shared ({ caller }) func whoami() : async Text {
   let callerText = Principal.toText(caller);
    D.print("this is the id of caller from backend" # callerText);
    return callerText;
  };

  //appoinments section
  public shared ({ caller }) func addAppointment(appointment : Appointment) : async Result<(), Text> {
    let appointmentsBuffer = switch (appointments.get(appointment.doctorId)) {
      case (null) {
        let newBuffer = Buffer.Buffer<Appointment>(1);
        appointments.put(appointment.doctorId, newBuffer);
        newBuffer;
      };
      case (?buffer) {
        buffer;
      };
    };
    appointmentsBuffer.add(appointment);
    return #ok();
  };

  public shared ({ caller }) func getAppointments(doctorId : Text) : async Result<[Appointment], Text> {
    switch (appointments.get(doctorId)) {
      case (null) {
        return #err("Doctor not found or no appointments.");
      };
      case (?appointmentsBuffer) {
        return #ok(Buffer.toArray(appointmentsBuffer));
      };
    };
  };

  public shared ({ caller }) func cancelAppointment(doctorId : Text, appointmentIndex : Nat) : async Result<(), Text> {
    switch (appointments.get(doctorId)) {
      case (null) {
        return #err("Doctor not found or no appointments.");
      };
      case (?appointmentsBuffer) {
        if (appointmentIndex < appointmentsBuffer.size()) {
          let _ = appointmentsBuffer.remove(appointmentIndex);
          return #ok();
        } else {
          return #err("Invalid appointment index.");
        };
      };
    };
  };

  //log book

};

//apoinment section
