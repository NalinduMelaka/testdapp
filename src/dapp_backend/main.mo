import Result "mo:base/Result";
import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Types "types";
import Iter "mo:base/Iter";
import D "mo:base/Debug";

actor {
  type Patient = {
    firstname : Text;
    lastname : Text;
    phone : Text;
    address : Text;
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

  type User = {
    #patient : Patient;
    #doctor : Doctor;
    #pharma : Pharma;
  };

  type Result<Ok, Err> = Types.Result<Ok, Err>;
  type HashMap<K, V> = Types.HashMap<K, V>;

  let members = HashMap.HashMap<Principal, User>(0, Principal.equal, Principal.hash);

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

};
