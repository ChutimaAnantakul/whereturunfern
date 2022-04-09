import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

// const bcrypt = require("bcryptjs");

const createUserMutations = loader("../graphql/mutations/createUser.gql");

const Register = ({ history }) => {
  const [createUser] = useMutation(createUserMutations);
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const genderRef = useRef();
  // const profileImageUrlRef = useRef()
  const idcardRef = useRef();
  const birthdateRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const hashedPassword = await bcrypt(password, 10)

    const firstname = firstnameRef.current.value;
    const lastname = lastnameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;
    const gender = genderRef.current.value;
    // const profileImageUrl = profileImageUrlRef.current.value
    const idcard = idcardRef.current.value;
    const birthdate = birthdateRef.current.value;

    const { data } = await createUser({
      variables: {
        firstname,
        lastname,
        email,
        phone,
        password,
        gender,
        // profileimageurl,
        idcard,
        birthdate,
      },
    });

    // history.push(`/${data.createUser.user.id}`)
    history.push(`/login`);
  };

  return (
    <>
      <div className="container register">
        <div className="row">
          <div className="col-md-2 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Welcome</h3>
            <h6>You are 30 seconds away from earning your own money!</h6>
            {/* <input type="submit" name="" value="Login"/><br/> */}
          </div>
          <div className="col-md-10 register-right">
            {/* <ul class="nav nav-tabs nav-justified" id="myTab" role="tablist">
                <li class="nav-item">
                  <NavLink
                    class="nav-link active"
                    id="member-tab"
                    data-toggle="tab"
                    to="/register"
                    role="tab"
                    aria-controls="member"
                    aria-selected="false"
                  >
                    Member
                  </NavLink>
                </li>
                <li class="nav-item">
                  <NavLink
                    class="nav-link"
                    id="organizer-tab"
                    data-toggle="tab"
                    to="/organizer"
                    role="tab"
                    aria-controls="organizer"
                    aria-selected="false"
                  >
                    Organizer
                  </NavLink>
                </li>
               
              </ul> */}

            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="member"
                role="tabpanel"
                aria-labelledby="member-tab"
              >
                {/* <h3 className="register-heading">Apply as a Employee</h3> */}
                {/* <div className="row register-form"> */}
                <div className="col-10">
                  <div className="limiter">
                    <div className=" p-l-50  p-t-65 p-b-34">
                      <form
                        className="login100-form validate-form"
                        onSubmit={handleSubmit}
                      >
                        <span className="login100-form-title p-b-49">
                          Register
                        </span>
                        <div className="row">
                          <div className="col-6">
                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Username is reauired"
                            >
                              <span className="label-input100">Firsfname</span>
                              <input
                                className="input100"
                                type="text"
                                id="name"
                                ref={firstnameRef}
                                name="username"
                                placeholder="Type your name"
                                required
                              />
                              <span
                                className="focus-input100"
                                data-symbol="&#xf206;"
                              ></span>
                            </div>
                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Username is reauired"
                            >
                              <span className="label-input100">Lastname</span>
                              <input
                                className="input100"
                                type="text"
                                id="name"
                                ref={lastnameRef}
                                name="username"
                                placeholder="Type your name"
                                required
                              />
                              <span
                                className="focus-input100"
                                data-symbol="&#xf206;"
                              ></span>
                            </div>
                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Phone is reauired"
                            >
                              <span className="label-input100">Phone</span>
                              <input
                                className="input100"
                                type="text"
                                id="phone"
                                ref={phoneRef}
                                name="phone"
                                placeholder="xxxxxxxxxx"
                                maxLength="10"
                                // pattern="^\d{3}-\d{3}-\d{4}$"
                                required
                              />
                              <span
                                className="focus-input100"
                                data-symbol="&#xf2b6;"
                              ></span>
                            </div>
                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Phone is reauired"
                            >
                              <span className="label-input100">Birthdate</span>

                              <input
                                className=" input100"
                                type="date"
                                id="birthdate"
                                ref={birthdateRef}
                                name="birthdate"
                                placeholder="Type your birthdate"
                                required
                              />

                              <span
                                className="focus-input100"
                                data-symbol="&#xf122;"
                              ></span>
                            </div>

                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Phone is reauired"
                            >
                              <span className="label-input100">Gender</span>

                              <select
                                className=" input100"
                                type="text"
                                id="gender"
                                ref={genderRef}
                                name="gender"
                                placeholder="Type your gender"
                                aria-label="Default select example"
                                required
                              >
                                {/* <option></option> */}
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                              <span
                                className="focus-input100 "
                                data-symbol="&#xf211;"
                              ></span>
                            </div>
                          </div>
                          <div className="col-6">
                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Idcard is reauired"
                            >
                              <span className="label-input100">
                                ID card number
                              </span>
                              <input
                                className="input100"
                                type="text"
                                id="idcard"
                                ref={idcardRef}
                                name="idcard"
                                placeholder="x-xxxx-xxxxx-xx-x"
                                maxLength="13"
                                pattern="^\d{1}-\d{4}-\d{5}-\d{2}-\d{1}$"
                                // pattern="^\d{13}$"
                                required
                              />
                              <span
                                className="focus-input100"
                                data-symbol="&#xf2c3;"
                              ></span>
                            </div>

                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Email is reauired"
                            >
                              <span className="label-input100">Email</span>
                              <input
                                className="input100"
                                type="email"
                                id="email"
                                ref={emailRef}
                                name="email"
                                placeholder="wt@gmail.com"
                                //   value={this.state.email}
                                //   onChange={this.onChange}
                                required
                              />

                              <span
                                className="focus-input100"
                                data-symbol="&#xf159;"
                                style={{ color: "red" }}
                              >
                                {/* {this.state.errors["email"]} */}
                              </span>
                            </div>
                            <div
                              class="wrap-input100 validate-input m-b-23"
                              data-validate="Password is required"
                            >
                              <span class="label-input100">Password</span>
                              <input
                                class="input100"
                                type="password"
                                id="password"
                                ref={passwordRef}
                                name="password"
                                placeholder="Type your password"
                                minLength="8"
                                required
                                // value={this.state.input.password}
                                // onChange={this.handleChange}
                              />
                              {/* <div className="text-danger">{this.state.errors.password}</div> */}
                              <span
                                class="focus-input100"
                                data-symbol="&#xf190;"
                              ></span>
                            </div>

                            <div
                              className="wrap-input100 validate-input m-b-23"
                              data-validate="Comfirm Password is required"
                            >
                              <span className="label-input100" htmlFor="">
                                Comfirm Password
                              </span>
                              <input
                                class="input100"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Type your password"
                                maxLength="8"
                                required
                              />
                              <span
                                className="focus-input100"
                                data-symbol="&#xf190;"
                              ></span>
                            </div>
                          </div>
                        </div>

                        <div className="login100-form-btn">
                          <div className="row login100-form-btn">
                            <div claas="col-6">
                              <div className="wrap-login100-form-btn">
                                <div className="login100-form-bgbtn"></div>
                                <button
                                  className="login100-form-btn  "
                                  type="submit"
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                            {/* {messageTemplate} */}
                            <div claas="col-6">
                              <br />
                              {/* <div claas="col-6">
                                <div className="wrap-login100-form-btn">
                                  <div className="login100-form-bgbtn"></div>
                                  <button
                                    className="login100-form-btn  "
                                    type=""
                                    href="/login"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div> */}
                            </div>
                          </div>
                        </div>

                        <div className="flex-col-c p-t-50"></div>
                      </form>
                    </div>
                  </div>
                  {/* </div> */}

                  <div id="dropDownSelect1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
