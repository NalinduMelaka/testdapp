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

actor {

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
  principal: Principal;
  pharma: Pharma;
};


  type Result<Ok, Err> = Types.Result<Ok, Err>;
  type HashMap<K, V> = Types.HashMap<K, V>;


  let members = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);
  let patientIds = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
  let apiuserIds = HashMap.HashMap<Text, Principal>(0, Text.equal, Text.hash);
  let medicines = HashMap.HashMap<Principal, Buffer.Buffer<Medication>>(0, Principal.equal, Principal.hash);
  //for the contacts
  let contacts = HashMap.HashMap<Principal, Buffer.Buffer<Contact>>(0,Principal.equal, Principal.hash);
  //for pharamsists to keep medications
  let phamamedilist = HashMap.HashMap<Principal, Buffer.Buffer<PharmaWithPrincipal>>(0,Principal.equal, Principal.hash);
  let prescriptions = HashMap.HashMap<Principal, Buffer.Buffer<Prescription>>(0,Principal.equal, Principal.hash);
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

  public shared ({ caller }) func whoami() : async Principal {
    D.print(debug_show (caller));
    return caller;
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
