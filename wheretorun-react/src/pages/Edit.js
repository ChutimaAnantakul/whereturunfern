import React, { useRef } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";


const environmentsQuery = loader("../graphql/queries/environmentsyearcategory.gql");

const Edit = ({ history }) => {
  // const [createEvents] = useMutation(createEventMutations);
  // const eventnameThRef = useRef();
  // const eventnameEnRef = useRef();
  // const locationThRef = useRef();
  // const locationEnRef = useRef();
  // const provinceThRef = useRef();
  // const provinceEnRef = useRef();
  // const recetypeThRef = useRef();
  // const recetypeEnRef = useRef();
  // const linkurlRef = useRef();
  // const coverphotourlRef = useRef();
  // const startdateRef = useRef();
  // const enddateRef = useRef();
  // const descriptionThRef = useRef();
  // const descriptionEnRef = useRef();
  // const organizerRef = useRef();
  // const gpsRef = useRef();
  // const hashtagRef = useRef();
  // const yearIdRef = useRef();
  // const categoryIdRef = useRef();
  // const environmentIdRef = useRef();
  // // const adminIdRef = useRef();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const eventnameTh = eventnameThRef.current.value;
  //   const eventnameEn = eventnameEnRef.current.value;
  //   const locationTh = locationThRef.current.value;
  //   const locationEn = locationEnRef.current.value;
  //   const provinceTh = provinceThRef.current.value;
  //   const provinceEn = provinceEnRef.current.value;
  //   const recetypeTh = recetypeThRef.current.value;
  //   const recetypeEn = recetypeEnRef.current.value;
  //   const linkurl = linkurlRef.current.value;
  //   const coverphotourl = coverphotourlRef.current.value;
  //   const startdate = startdateRef.current.value;
  //   const enddate = enddateRef.current.value;
  //   const descriptionTh = descriptionThRef.current.value;
  //   const descriptionEn = descriptionEnRef.current.value;
  //   const gps = gpsRef.current.value;
  //   const organizer = organizerRef.current.value;
  //   const hashtag = hashtagRef.current.value;
  //   const yearId = yearIdRef.current.value;
  //   const categoryId = categoryIdRef.current.value;
  //   const environmentId = environmentIdRef.current.value;
  //   // const adminId = adminIdRef.current.value;

  //   const { data } = await createEvents({
  //     variables: {
  //       eventnameTh,
  //       eventnameEn,
  //       locationTh,
  //       locationEn,
  //       provinceTh,
  //       provinceEn,
  //       recetypeTh,
  //       recetypeEn,
  //       linkurl,
  //       coverphotourl,
  //       startdate,
  //       enddate,
  //       descriptionTh,
  //       descriptionEn,
  //       hashtag,
  //       gps,
  //       organizer,
  //       yearId,
  //       categoryId,
  //       environmentId,
  //       // adminId,
  //     },
  //   });
  //   // history.push(`/${data.createUser.user.id}`)
  //   history.push(`/edit`);
  // };

  const { error, loading, data } = useQuery(environmentsQuery);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  // const { year } = useQuery(yearQuery);

  return (
    <>
      <section id="contact" class="contact">
        <div class="container" data-aos="fade-up">
          <div class="section-title">
            {/* <h2>Contact</h2> */}
            <h3>
              <span>Craete Event</span>
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
                // onSubmit={handleSubmit}
              >
                <h1 class="">Event</h1>
                <br />
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">EventNameTH</label>
                    <input
                      type="text"
                      name="eventname"
                      class=" input100 form-control form-control-lg"
                      id="eventname"
                      placeholder="ชื่องานวิ่ง*"
                      // ref={eventnameThRef}
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">EventNameEN</label>
                    <input
                      type="text"
                      name="eventname"
                      class=" input100 form-control form-control-lg"
                      id="eventname"
                      placeholder="EventName*"
                      // ref={eventnameEnRef}
                      required
                    />
                  </div>
                </div>
                <div class="row">
                <div class="col form-group">
                    <label className="label-input100">Organizer</label>
                    <input
                      type="text"
                      name="organizer"
                      class=" input100 form-control form-control-lg"
                      id="organizer"
                      placeholder="จัดโดย*"
                      // ref={organizerRef}
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">LocationTH</label>
                    <input
                      type="text"
                      name="location"
                      class=" input100 form-control form-control-lg"
                      id="location"
                      placeholder="สถานที่จัดงานภาษาไทย*"
                      // ref={locationThRef}
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">LocationEN</label>
                    <input
                      type="text"
                      name="location"
                      class=" input100 form-control form-control-lg"
                      id="location"
                      placeholder="Location*"
                      // ref={locationEnRef}
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">GPS</label>
                    <input
                      type="text"
                      name="gps"
                      class=" input100 form-control form-control-lg"
                      id="gps"
                      placeholder="GPS*"
                      // ref={gpsRef}
                      required
                    />
                    <span>
                      *พิกัด GPS ผ่านเว็บไซต์ Google Maps ของสถานที่สำหรับ
                      ตัวอย่างพิกัด: 16.349679500574148, 102.80224833862579
                    </span>
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">ProvinceTH</label>
                    <input
                      name="province"
                      class=" input100 form-control form-control-lg"
                      id="province"
                      aria-label="Default select example"
                      placeholder="ชื่อจังหวัด*"
                      // ref={provinceThRef}
                      required
                    />
                    <span>
                      *เขียนชื่อเต็มจังหวัด ตัวอย่างเช่น: กรุงเทพมหานคร
                    </span>
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">ProvinceEN</label>
                    <input
                      name="province"
                      class=" input100 form-control form-control-lg"
                      id="province"
                      aria-label="Default select example"
                      placeholder="Province*"
                      // ref={provinceEnRef}
                      required
                    />
                    <span>
                      Write the full name of the province For example: Bangkok
                    </span>
                  </div>
                </div>

                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">StartEventDate</label>
                    <input
                      type="date"
                      name="startdate"
                      class=" input100 form-control form-control-lg"
                      id="startdate"
                      placeholder="StartEventDate*"
                      // ref={startdateRef}
                      required
                    />
                  </div>

                  <div class="col form-group">
                    <label className="label-input100">EndEventDate</label>
                    <input
                      type="date"
                      name="enddate"
                      class=" input100 form-control form-control-lg"
                      id="enddate"
                      placeholder="EndEventDate*"
                      // ref={enddateRef}
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">year</label>
                    {/* <input
                      type="number"
                      name="year"
                      class=" input100 form-control form-control-lg"
                      id="year"
                      placeholder="year*"
                      ref={yearIdRef}
                      required
                    /> */}
                    <select
                      type="text"
                      name="environmant"
                      class="input100 form-control form-control-lg"
                      id="environmant"
                      placeholder="environmant*"
                      // ref={yearIdRef}
                      required
                    >
                      <option selected>เลือกปี*</option>
                      {data.years.nodes.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.year}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* <div class="col-2 form-group">
                    <label className="label-input100">createYear</label>
                    <li class=" input100">
                      <Link
                        type="button"
                        class="btn btn-primary"
                        to="/createYear"
                      >
                        + year
                      </Link>
                    </li>
                  </div> */}
              
                </div>
                

                <div class="row">
                  <div class="col-4 form-group">
                    <label className="label-input100">EnvironmentEvent</label>
                    {/* <input
                      type="text"
                      name="racetypeevemt"
                      class=" input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="RaceTypeEvent*"
                      required
                    /> */}

                    <select
                      type="text"
                      name="environmant"
                      class="input100 form-control form-control-lg"
                      id="environmant"
                      placeholder="environmant*"
                      // ref={environmentIdRef}
                      required
                    >
                      <option selected>เลือกสภาพแวดล้อมของงานวิ่ง*</option>
                      {data.environments.nodes.map((environments) => (
                        <option key={environments.id} value={environments.id}>
                          {environments.environmenteventTh}
                        </option>
                      ))}
                    </select>
                  </div>
                    
                  
                  <div class="col-3 form-group">
                    <label className="label-input100">RaceTypeEventTH</label>
                    {/* <input
                      type="text"
                      name="racetypeevemt"
                      class=" input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="ประเภทงานวิ่ง*"
                      required
                    /> */}

                    <select
                      type="text"
                      name="racetypeevemt"
                      class="input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="RaceTypeEvent*"
                      // ref={recetypeThRef}
                      required
                    >
                      <option selected>เลือกประเภทงานวิ่ง*</option>
                      <option>มินิมาราธอน</option>
                      <option>ฮาลฟ์มาราธอน</option>
                      <option>มาราธอน</option>
                      <option>อัลตร้ามาราธอน</option>
                    </select>
                  </div>
                  <div class="col-3 form-group">
                    <label className="label-input100">RaceTypeEventEN</label>
                    {/* <input
                      type="text"
                      name="racetypeevemt"
                      class=" input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="RaceTypeEvent*"
                      required
                      /> */}
                    <select
                      type="text"
                      name="racetypeevemt"
                      class="input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="RaceTypeEvent*"
                      // ref={recetypeEnRef}
                      required
                    >
                      <option selected>select race event*</option>
                      <option>Mini-Marathon</option>
                      <option>Half-Marathon</option>
                      <option>Marathon</option>
                      <option>Ultra-Marathon</option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">Trail Running</label>
                    {/* <input
                      type="text"
                      name="category"
                      class=" input100 form-control form-control-lg"
                      id="category"
                      placeholder="Category*"
                      required
                    /> */}
                    <select
                      type="text"
                      name="racetypeevemt"
                      class="input100 form-control form-control-lg"
                      id="racetypeevemt"
                      placeholder="หมวดหมู่งานวิ่ง*"
                      required
                    >
                      <option selected>เลือกหมวดหมู่งานวิ่ง*</option>
                      {data.categories.nodes.map((categories) => (
                        <option key={categories.id} value={categories.id}>
                          {categories.categorynameTh}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">Hashtag</label>
                    <input
                      type="text"
                      name="้hashtag"
                      class=" input100 form-control form-control-lg"
                      id="hashtag"
                      placeholder="Hashtag*"
                      // ref={hashtagRef}
                      required
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">LinkUrl</label>
                    <input
                      type="text"
                      name="linkurl"
                      class=" input100 form-control form-control-lg"
                      id="linkurl"
                      placeholder="LinkUrl*"
                      // ref={linkurlRef}
                      required
                    />
                    <span>*linkUrl ของเว็บลงทะเบียนสมัครวิ่ง</span>
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">Image</label>
                    <input
                      type="text"
                      name="img"
                      class=" input100 form-control form-control-lg"
                      id="igm"
                      placeholder="Image*"
                      // ref={coverphotourlRef}
                      required
                    />
                    {/* <span>*linkUrl ของรูปงานวิ่ง</span> */}
                  </div>
                </div>

                <div class="form-group">
                  <label className="label-input100">DescriptionTH</label>
                  <textarea
                    class="input100 form-control"
                    name="message"
                    rows="5"
                    placeholder="รายละเอียดงานวิ่ง*"
                    // ref={descriptionThRef}
                    required
                  ></textarea>
                  {/* <span>*รายละเอียดงานวิ่งเพิ่มเติม</span> */}
                </div>
                <div class="form-group">
                  <label className="label-input100">DescriptionEN</label>
                  <textarea
                    class="input100 form-control"
                    name="message"
                    rows="5"
                    placeholder="Description*"
                    // ref={descriptionEnRef}
                    required
                  ></textarea>
                  {/* <span>*รายละเอียดงานวิ่งเพิ่มเติม</span> */}
                </div>
                <div class="my-3">
                  <div class="loading">Loading</div>
                  <div class="error-message"></div>
                  <div class="sent-message">
                    Your message has been sent. Thank you!
                  </div>
                </div>
                <div class="text-center input100">
                  <button type="submit" onclick="alert('บันทึกสำเร็จ')">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Edit;
