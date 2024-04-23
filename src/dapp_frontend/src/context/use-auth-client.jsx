import { AuthClient } from "@dfinity/auth-client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { HttpAgent } from "@dfinity/agent";

import { canisterId, createActor } from 'declarations/dapp_backend';
import { dapp_backend } from 'declarations/dapp_backend';
const AuthContext = createContext();

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
    identityProvider:
      process.env.DFX_NETWORK === "ic"
        ? "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943"
        : `https://identity.ic0.app`,
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

  const login = () => {
    authClient.login({
      ...options.loginOptions,
      onSuccess: () => {
        updateClient(authClient);
      },
    });
  };

  async function updateClient(client) {
    try {
      const isAuthenticated = await client.isAuthenticated();
      setIsAuthenticated(isAuthenticated);

      const identity = client.getIdentity();
      setIdentity(identity);

      const principal = identity.getPrincipal();
      setPrincipal(principal);



      const member = await dapp_backend.getMember();
      if (member.ok) {
        setIsMember(true);
        const key = Object.keys(member.ok);
        const obj = member.ok;

        setMemeber(Object.values(obj)[0]);
        setMemebertype(key[0]);
      }
      // console.log("this is the object", JSON.stringify(identity));
      // console.log('is authenticated id is ', JSON.stringify(principal));

      setAuthClient(client);


      const actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });

      setWhoamiActor(actor);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.error("Error updating client:", error);
      // Handle error gracefully
    }
  }

  async function logout() {
    try {
      await authClient?.logout();
      await updateClient(null); // Reset the state
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
    loading,
    isMember,
    membertype,
    member,
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
