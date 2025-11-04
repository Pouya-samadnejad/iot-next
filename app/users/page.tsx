import * as React from "react";

interface ComponentNameProps {
  propName: type;
}

const Page: React.FC<ComponentNameProps> = ({ propName }) => {
  return <div>users</div>;
};

export default Page;
