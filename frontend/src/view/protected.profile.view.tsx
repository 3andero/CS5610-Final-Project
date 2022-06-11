import { withAuthenticationRequired } from "@auth0/auth0-react";
import { BackButton } from "../components/back.button";
import { appConfig } from "../config";

const _profile = () => {
  return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <pre>{JSON.stringify(appConfig, null, 2)}</pre>
        <BackButton />
      </div>
    </div>
  );
};

export const Profile = withAuthenticationRequired(_profile);
