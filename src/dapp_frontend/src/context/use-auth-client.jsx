import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";

import { canisterId, createActor } from "declarations/dapp_backend";
import {
  canisterId as canisterIdtwo,
  createActor as createActortwo,
} from "declarations/assets";

const AuthContext = createContext();

export const getIdentityProvider = () => {
  let idpProvider;
  // Safeguard against server rendering
  if (typeof window !== "undefined") {
    const isLocal = process.env.DFX_NETWORK !== "ic";
    // Safari does not support localhost subdomains
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isLocal && isSafari) {
      idpProvider = `http://localhost:4943/?canisterId=${process.env.CANISTER_ID_II}`;
    } else if (isLocal) {
      idpProvider = `http://${process.env.CANISTER_ID_II}.localhost:4943`;
    }
  }
  return idpProvider;
};

const defaultOptions = {
  /**
   *  @type {import("@dfinity/auth-client").AuthClientCreateOptions}
   */
  createOptions: {
    idleOptions: {
      // Set to true if you do not want idle functionality
      disableIdle: true,
    },
  },
  /**
   * @type {import("@dfinity/auth-client").AuthClientLoginOptions}
   */
  loginOptions: {
    identityProvider: getIdentityProvider(),
  },
};

/**
 *
 * @param options - Options for the AuthClient
 * @param {AuthClientCreateOptions} options.createOptions - Options for the AuthClient.create() method
 * @param {AuthClientLoginOptions} options.loginOptions - Options for the AuthClient.login() method
 * @returns
 */
export const useAuthClient = (options = defaultOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [principal, setPrincipal] = useState(null);
  const [whoamiActor, setWhoamiActor] = useState(null);
  const [whoamiActorTwo, setWhoamiActorTwo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [membertype, setMemebertype] = useState();
  const [member, setMemeber] = useState({});

  useEffect(() => {
    // Initialize AuthClient
    AuthClient.create(options.createOptions).then(async (client) => {
      updateClient(client);
    });
  }, []);

  useEffect(() => {
    const getfunc = async () => {
      console.log("whoamiActor has been updated:", whoamiActor);
      const member = await whoamiActor.getMember();
      console.log("this is the member", member);
      if (member.ok) {
        setIsMember(true);
        const key = Object.keys(member.ok);
        const obj = member.ok;

        setMemeber(Object.values(obj)[0]);
        setMemebertype(key[0]);
      } else {
        console.log("this is not a member", member);
        setIsMember(false);
      }
    };
    getfunc();
  }, [whoamiActor, isMember]);

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: async () => {
        await updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    const isAuthenticated = await client.isAuthenticated();
    setIsAuthenticated(isAuthenticated);

    const identity = client.getIdentity();
    setIdentity(identity);

    const principal = identity.getPrincipal();
    setPrincipal(principal);

    console.log("this is the principal", principal.toText());

    setAuthClient(client);

    const actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    const actortwo = createActortwo(canisterIdtwo, {
      agentOptions: { identity },
    });

    setWhoamiActor(actor);
    setWhoamiActorTwo(actortwo);
    setLoading(false);
    console.log("this is the backend canister id:::", canisterId);
    console.log("this is the actor::", actor);
    console.log("this is the result", whoamiActor);
    console.log("this is the result2", whoamiActorTwo);
  }

  async function logout() {
    try {
      await authClient?.logout();
      await updateClient(authClient); // Reset the state
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error gracefully
    }
  }

  return {
    isAuthenticated,
    login,
    logout,
    authClient,
    identity,
    principal,
    whoamiActor,
    whoamiActorTwo,
    loading,
    isMember,
    membertype,
    member,
    setIsMember,
    setMemebertype,
  };
};

/**
 * @type {React.FC}
 */
export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
