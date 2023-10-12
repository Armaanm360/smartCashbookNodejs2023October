import server from "../../server";
import chai from "chai";
import chaiHttp from "chai-http";
chai.use(chaiHttp);

const generateTokenForMember = async (adminCredential: any) => {
  const { email, password } = adminCredential;
  const credential = {
    email: email,
    password: password,
  };

  const token = await chai
    .request(server)
    .post("/api/v1/auth/member/login")
    .send(credential);

  return token;
};

export default generateTokenForMember;
