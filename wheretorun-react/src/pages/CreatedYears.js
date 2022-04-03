import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { loader } from "graphql.macro";

const createYearMutations = loader("../graphql/mutations/createYear.gql");

const CreatedYears = ({ history }) => {
    
    const [createYear] = useMutation(createYearMutations);
    const yearRef = useRef();
   
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const year = Number(yearRef.current.value);
      
      const { data } = await createYear({
        variables: {
            year,
        },
      });

      history.push(`/createdEvent`);
    };
  
  return (
    <>
      <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            {/* <h2>Contact</h2> */}
            <h3>
              <span>Craeted Year</span>
            </h3>
            <p>
              Ut possimus qui ut temporibus culpa velit eveniet modi omnis est
              adipisci expedita at voluptas atque vitae autem.
            </p>
          </div>

          <div class="row" data-aos="fade-up" data-aos-delay="100">
            <div class="col-lg">
              <form
                action="forms/contact.php"
                method="post"
                role="form"
                class="php-email-form"
                onSubmit={handleSubmit}
              >
                <h1 class="">Year</h1>
                <br />
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">Year</label>
                    <input
                      type="number"
                      name="year"
                      class=" input100 form-control form-control-lg"
                      id="year"
                      placeholder="ํyear*"
                      ref={yearRef}
                      required
                    />
                     <span>
                      เขียนแบบ ค.ศ
                    </span>
                  </div>
                </div>
                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div class="row">
                <div class="text-center input100">
                  <button type="cancel">Cancel</button>
                </div>
                <div class="text-center input100">
                  <button type="submit" onclick="alert('บันทึกสำเร็จ')">Submit</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CreatedYears;
