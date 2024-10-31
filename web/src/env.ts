const defaultEnv = {
  API_URL: "http://localhost:3001/api",
};

type Env = typeof defaultEnv;

declare global {
  interface Window {
    env: Env;
  }
}

export const env = () => {
  const fromWindow = window.env;
  const env = { ...defaultEnv, ...fromWindow } as Env;
  return env;
};
