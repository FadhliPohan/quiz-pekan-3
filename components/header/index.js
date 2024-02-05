import Menuku from "../menu";
import { withAuth } from "../with-auth";

const Header = () => {
  return (
    <div>
      <Menuku></Menuku>
    </div>
  );
};

export default withAuth(Header);
