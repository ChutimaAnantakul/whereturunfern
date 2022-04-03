import React from 'react';



const Login = () => {

    return (
      <>
        <div class="container login">
          <div class="row">
            <div class="col-md-3 login-left">
              <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
              <h3>Welcome</h3>
              <h6>You are 30 seconds away from earning your own money!</h6>
              {/* <input type="submit" name="" value="Login"/><br/> */}
            </div>
            <div class="col-md-9 login-right">
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="member"
                  role="tabpanel"
                  aria-labelledby="member-tab"
                >
                  {/* <div class="row register-form"> */}
                  <div class="col-10">
                    <div class="limiter">
                      <div class=" p-l-55 p-r-55 p-t-65 p-b-54">
                        <form
                          class="login100-form validate-form"
                          // onSubmit={this.submitHandler}
                        >
                          <span class="login100-form-title p-b-49">Login </span>

                          <div
                            class="wrap-input100 validate-input m-b-23"
                            data-validate="Username is reauired"
                          >
                            <span class="label-input100" htmlFor="email">
                              Email
                            </span>
                            <input
                              class="input100"
                              type="email"
                              id="email"
                              // ref={this.emailEl}
                              name="username"
                              placeholder="Type your email"
                              required
                            />
                            <span
                              class="focus-input100"
                              data-symbol="&#xf206;"
                            ></span>
                          </div>

                          <div
                            class="wrap-input100 validate-input"
                            data-validate="Password is required"
                          >
                            <span class="label-input100" htmlFor="Password">
                              Password
                            </span>
                            <input
                              class="input100"
                              type="password"
                              id="password"
                              // ref={this.passwordEl}
                              name="password"
                              placeholder="Type your password"
                              required
                            />
                            <span
                              class="focus-input100"
                              data-symbol="&#xf190;"
                            ></span>
                          </div>

                          <div class="text-right p-t-8 p-b-31">
                            <a href="#">Forgot password?</a>
                          </div>

                          <div class="container-login100-form-btn">
                            {/* <div class="row">
                              <div claas="col-8"> */}
                            <div class="wrap-login100-form-btn">
                              <div class="login100-form-bgbtn"></div>
                              <button class="login100-form-btn " type="submit">
                                Login
                              </button>
                            </div>                         
                          </div>

                          <div class="flex-col-c p-t-50">
                            {/* <span class="txt1 p-b-17">Or Sign Up Using</span> */}

                            <a href="/register" class="txt2">
                              Or Sign Up Using
                            </a>
                          </div>
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

export default Login;
