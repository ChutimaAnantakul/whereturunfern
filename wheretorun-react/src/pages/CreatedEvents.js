import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";
import { enGB } from "date-fns/locale";
import { DateRangePicker, START_DATE, END_DATE } from "react-nice-dates";
import "react-nice-dates/build/style.css";

const createEventMutations = loader("../graphql/mutations/createEvents.gql");
const provincesandyear = loader("../graphql/queries/provincesandyear.gql");

const CreatedEvents = ({ history }) => {
  const [createEvents] = useMutation(createEventMutations);
  const eventnameThRef = useRef();
  const eventnameEnRef = useRef();
  const locationThRef = useRef();
  const locationEnRef = useRef();
  const openforapplicationsRef = useRef();
  const applicationdeadlineRef = useRef();
  const latitudeRef = useRef();
  const longitudeRef = useRef();
  const linkurlRef = useRef();
  const coverphotourlRef = useRef();
  const startdateRef = useRef();
  const enddateRef = useRef();
  const descriptionThRef = useRef();
  const descriptionEnRef = useRef();
  const organizerRef = useRef();
  const posterRef = useRef();
  const facebookurlRef = useRef();
  const hashtagRef = useRef();
  const yearIdRef = useRef();
  const awardphotoRef = useRef();
  const provinceIdRef = useRef();
  const shirtsizeRef = useRef();
  // const adminIdRef = useRef();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [startapplyDate, setStartApplyDate] = useState();
  const [endapplyDate, setEndApplyDate] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventnameTh = eventnameThRef.current.value;
    const eventnameEn = eventnameEnRef.current.value;
    const locationTh = locationThRef.current.value;
    const locationEn = locationEnRef.current.value;
    const openforapplications = openforapplicationsRef.current.value;
    const applicationdeadline = applicationdeadlineRef.current.value;
    const latitude = Number(latitudeRef.current.value);
    const longitude = Number(longitudeRef.current.value);
    const linkurl = linkurlRef.current.value;
    const coverphotourl = coverphotourlRef.current.value;
    const startdate = startdateRef.current.value;
    const enddate = enddateRef.current.value;
    const descriptionTh = descriptionThRef.current.value;
    const descriptionEn = descriptionEnRef.current.value;
    const poster = posterRef.current.value;
    const organizer = organizerRef.current.value;
    const hashtag = hashtagRef.current.value;
    const yearId = yearIdRef.current.value;
    const facebookurl = facebookurlRef.current.value;
    const awardphoto = awardphotoRef.current.value;
    const provinceId = provinceIdRef.current.value;
    const shirtsize = shirtsizeRef.current.value;

    // const adminId = adminIdRef.current.value;

    const { data } = await createEvents({
      variables: {
        eventnameTh,
        eventnameEn,
        locationTh,
        locationEn,
        openforapplications,
        applicationdeadline,
        poster,
        facebookurl,
        linkurl,
        coverphotourl,
        startdate,
        enddate,
        descriptionTh,
        descriptionEn,
        hashtag,
        latitude,
        longitude,
        organizer,
        yearId,
        awardphoto,
        shirtsize,
        provinceId,
        // adminId,
      },
    });
    // history.push(`/${data.createUser.user.id}`)
    // history.push(`/createdEvents/${data.createEvent.event.id}`);
    history.push(`/createEventRaceEvm`);
  };

  const { error, loading, data } = useQuery(provincesandyear);

  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <>
      <section class="breadcrumbs">
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <h2>Created Event</h2>
          </div>
        </div>
      </section>
      <section id="contact">
        <div class="container" data-aos="fade-up">
          <div class="row" data-aos="fade-up" data-aos-delay="50">
            <div class="col">
              <form
                className="login100-form validate-form"
                onSubmit={handleSubmit}
              ><br/>
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">ชื่องานวิ่งภาษาไทย</label>
                    <input
                      type="text"
                      name="eventname"
                      class=" input100 form-control form-control"
                      id="eventname"
                      placeholder="ชื่องานวิ่งภาษาไทย*"
                      ref={eventnameThRef}
                      pattern="[a-zA-Zก-ุฯ-๙0-9.'\s]*"
                      title="กรุณากรอกตัวอักษร"
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">
                      ชื่องานวิ่งภาษาอังกฤษ
                    </label>
                    <input
                      type="text"
                      name="eventname"
                      class=" input100 form-control form-control-lg"
                      id="eventname"
                      placeholder="ชื่องานวิ่งภาษาอังกฤษ*"
                      ref={eventnameEnRef}
                      pattern="[A-Za-z()-_+/\,.0-9@%^&*!:;<>]"
                      title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">ผู้จัดงาน</label>
                    <input
                      type="text"
                      name="organizer"
                      class=" input100 form-control form-control-lg"
                      id="organizer"
                      placeholder="จัดโดย*"
                      ref={organizerRef}
                      pattern="[a-zA-Zก-ุฯ-๙0-9./\s]*"
                      title="กรุณากรอกตัวอักษร"
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">
                      สถานที่จัดงานภาษาไทย
                    </label>
                    <input
                      type="text"
                      name="location"
                      class=" input100 form-control form-control-lg"
                      id="location"
                      placeholder="สถานที่จัดงานภาษาไทย*"
                      ref={locationThRef}
                      pattern="[a-zA-Zก-ุฯ-๙0-9,/\.-\s]*"
                      title="กรุณากรอกตัวอักษร"
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">
                      สถานที่จัดงานภาษาอังกฤษ
                    </label>
                    <input
                      type="text"
                      class=" input100 form-control form-control-lg"
                      placeholder="สถานที่จัดงานภาษาอังกฤษ*"
                      ref={locationEnRef}
                      pattern="[A-Za-z0-9,/\-.\s]*"
                      title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                      required
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">ลองจิจูด</label>
                    <input
                      type="number"
                      name="gps"
                      class=" input100 form-control form-control-lg"
                      placeholder="ลองจิจูด*"
                      ref={longitudeRef}
                      // pattern="^\d*(\.\d{0,6})?$"
                      min="97.00000000000000000"
                      max="150.00000000000000000"
                      step="0.00000000000000001"
                      title="ไม่่ได้อยู่ในพิกัดลองจิจูดของประเทศไทย"
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">ละติจูด</label>
                    <input
                      type="number"
                      class=" input100 form-control form-control-lg"
                      placeholder="ละติจูด*"
                      ref={latitudeRef}
                      min="5.00000000000000000"
                      max="20.00000000000000000"
                      step="0.00000000000000001"
                      title="ไม่่ได้อยู่ในพิกัดละติจูดของประเทศไทย"
                      required
                    />
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">ชื่อจังหวัด</label>
                    {/* <input
                      name="province"
                      class=" input100 form-control form-control-lg"
                      id="province"
                      aria-label="Default select example"
                      placeholder="ชื่อจังหวัด*"
                      ref={provinceIdRef}
                      required
                    /> */}
                    <select
                      type="text"
                      name="environmant"
                      class="input100 form-control form-control-lg"
                      id="environmant"
                      placeholder="environmant*"
                      ref={provinceIdRef}
                      required
                    >
                      <option selected>เลือกจังหวัด*</option>
                      {data.provinces.nodes.map((province) => (
                        <option key={province.id} value={province.id}>
                          {province.provinceTh}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div class="row">
                  <div class="col-6 form-group">
                    {/* <label className="label-input100">เปิดรับสมัคร</label>
                    <input
                      type="date"
                      name="startdate"
                      class="input100 form-control form-control-lg"
                      id="startdate"
                      placeholder="StartEventDate*"
                      ref={openforapplicationsRef}
                      required
                    /> */}
                    <label className="label-input100">
                      เปิด-ปิดวันรับสมัคร
                    </label>
                    <div class="card input100 form-control form-control-lg">
                      <DateRangePicker
                        class="input100 form-control form-control-lg center"
                        startDate={startapplyDate}
                        endDate={endapplyDate}
                        onStartDateChange={setStartApplyDate}
                        onEndDateChange={setEndApplyDate}
                        // ref={startdateRef}
                        // ref={enddateRef}
                        minimumDate={new Date()}
                        minimumLength={0}
                        format="dd MMM yyyy"
                        locale={enGB}
                      >
                        {({
                          startDateInputProps,
                          endDateInputProps,
                          focus,
                        }) => (
                          <div className="date-range">
                            <input
                              // class="col-6 input100 form-control form-control-lg"
                              // className={
                              //   "input" +
                              //   (focus === START_DATE ? " -focused" : "")
                              // }
                              {...startDateInputProps}
                              ref={applicationdeadlineRef}
                              placeholder="Start date"
                              // type="date"
                              required
                            />
                            <span className="date-range_arrow" />
                            <input
                              // class="col-6 input100 form-control form-control-lg"
                              // className={
                              //   "input" + (focus === END_DATE ? " -focused" : "")
                              // }
                              {...endDateInputProps}
                              ref={openforapplicationsRef}
                              placeholder="End date"
                              required
                            />
                          </div>
                        )}
                      </DateRangePicker>
                    </div>
                  </div>
                  <div class="col-6 form-group">
                    {/* <label className="label-input100">เปิดรับสมัคร</label>
                    <input
                      type="date"
                      name="startdate"
                      class="input100 form-control form-control-lg"
                      id="startdate"
                      placeholder="StartEventDate*"
                      ref={openforapplicationsRef}
                      required
                    /> */}
                    <label className="label-input100">เปิด-ปิดงานวิ่ง</label>
                    <div class="card input100 form-control form-control-lg">
                      <DateRangePicker
                        class="input100 form-control form-control-lg center"
                        startDate={startDate}
                        endDate={endDate}
                        onStartDateChange={setStartDate}
                        onEndDateChange={setEndDate}
                        // ref={startdateRef}
                        // ref={enddateRef}
                        minimumDate={new Date()}
                        minimumLength={0}
                        format="dd MMM yyyy"
                        locale={enGB}
                      >
                        {({
                          startDateInputProps,
                          endDateInputProps,
                          focus,
                        }) => (
                          <div className="date-range">
                            <input
                              // class="col-6 input100 form-control form-control-lg"
                              className={
                                "input" +
                                (focus === START_DATE ? " -focused" : "")
                              }
                              {...startDateInputProps}
                              ref={startdateRef}
                              placeholder="Start date"
                              required
                            />
                            <span className="date-range_arrow" />
                            <input
                              // class="col-6 input100 form-control form-control-lg"
                              className={
                                "input" +
                                (focus === END_DATE ? " -focused" : "")
                              }
                              {...endDateInputProps}
                              ref={enddateRef}
                              placeholder="End date"
                              required
                            />
                          </div>
                        )}
                      </DateRangePicker>
                    </div>
                  </div>

                  {/* <div class="col form-group">
                    <label className="label-input100">ปิดรับสมัคร</label>
                    <input
                      type="date"
                      name="enddate"
                      class=" input100 form-control form-control-lg"
                      id="enddate"
                      placeholder="EndEventDate*"
                      dateFormat="dd/MM/yyyy"
                      ref={applicationdeadlineRef}
                      required
                    />
                  </div> */}
                </div>


                <div className="login100-form-btn">
                  <div className="row login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>

                
                <div class="row">
                  {/* <div class="col form-group">
                    <label className="label-input100">งานวิ่งวันแรก</label>
                    <input
                      type="date"
                      name="startdate"
                      class=" input100 form-control form-control-lg"
                      id="startdate"
                      placeholder="StartEventDate*"
                      dateFormat="dd/MM/yyyy"
                      ref={startdateRef}
                      required
                    />
                  </div> */}

                  {/* <div class="col form-group">
                    <label className="label-input100">งานวิ่งวันสุดท้าย</label>
                    <input
                      type="date"
                      name="enddate"
                      class=" input100 form-control form-control-lg"
                      id="enddate"
                      placeholder="EndEventDate*"
                      dateFormat="dd/MM/yyyy"
                      ref={enddateRef}
                      required
                    />
                  </div> */}

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
                  {/* <div className="col-2 form-group">
                    <label className="label-input100"></label>
                        <li className="login100-form-btn input100"><Link
                        type="button"
                          to="/createYear"
                        >
                          + Year
                        </Link>
                        </li>
                      </div> */}
                </div>

                <div class="row">
                  {/* <div class="col-4 form-group">
                    <label className="label-input100">EnvironmentEvent</label>
                    <select
                      type="text"
                      name="environmant"
                      class="input100 form-control form-control-lg"
                      id="environmant"
                      placeholder="environmant*"
                      ref={environmentIdRef}
                      required
                    >
                      <option selected>เลือกสภาพแวดล้อมของงานวิ่ง*</option>
                      {data.environments.nodes.map((environments) => (
                        <option key={environments.id} value={environments.id}>
                          {environments.environmenteventTh}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  {/* <div className="col-2 form-group">
                    <label className="label-input100"></label>
                        <li className="login100-form-btn input100"><Link
                        type="button"
                          to="/createEnvironment"
                        >
                          + Environment
                        </Link>
                        </li>
                      </div>
                     */}
                </div>
                <div class="row">
                  {/* <div className="col-2 form-group">
                    <label className="label-input100"></label>
                        <li className="login100-form-btn input100"><Link
                        type="button"
                          to="/createCategory"
                        >
                          + Category
                        </Link>
                        </li>
                      </div> */}
                  <div class="col-4 form-group">
                    <label className="label-input100">ปีที่จัดงานวิ่ง</label>
                    <select
                      type="text"
                      name="environmant"
                      class="input100 form-control form-control-lg"
                      id="environmant"
                      placeholder="environmant*"
                      ref={yearIdRef}
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

                  <div class="col form-group">
                    <label className="label-input100">Hashtag</label>
                    <input
                      type="text"
                      name="้hashtag"
                      class=" input100 form-control form-control-lg"
                      id="hashtag"
                      placeholder="Hashtag*"
                      ref={hashtagRef}
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
                      ref={linkurlRef}
                      required
                    />
                    <span>*linkUrl ของเว็บลงทะเบียนสมัครวิ่ง</span>
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">
                      Link Facebook (ถ้ามี)
                    </label>
                    <input
                      type="text"
                      name="linkurl"
                      class=" input100 form-control form-control-lg"
                      id="linkurl"
                      placeholder="LinkUrl*"
                      ref={facebookurlRef}
                      required
                    />
                    <span>*link Facebook ของงานวิ่ง</span>
                  </div>
                </div>

                <div class="row">
                  <div class="col form-group">
                    <label className="label-input100">poster (ถ้ามี)</label>
                    <input
                      type="text"
                      name="linkurl"
                      class=" input100 form-control form-control-lg"
                      id="linkurl"
                      placeholder="poster*"
                      ref={posterRef}
                      // required
                    />
                    {/* <span>*linkUrl ของเว็บลงทะเบียนสมัครวิ่ง</span> */}
                  </div>
                  <div class="col form-group">
                    <label className="label-input100">ภาพของรางวัล</label>
                    <input
                      type="text"
                      name="img"
                      class=" input100 form-control form-control-lg"
                      id="igm"
                      placeholder="Image*"
                      ref={awardphotoRef}
                      required
                    />
                    {/* <span>*linkUrl ของรูปงานวิ่ง</span> */}
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 form-group">
                    <label className="label-input100">ภาพปก</label>
                    <input
                      type="text"
                      name="img"
                      class=" input100 form-control form-control-lg"
                      id="igm"
                      placeholder="Image*"
                      ref={coverphotourlRef}
                      required
                    />
                    {/* <span>*linkUrl ของรูปงานวิ่ง</span> */}
                  </div>
                  <div class="col-6 form-group">
                    <label className="label-input100">
                      ภาพขนาดของเสื้อ (ถ้ามี)
                    </label>
                    <input
                      type="text"
                      name="img"
                      class=" input100 form-control form-control-lg"
                      id="igm"
                      placeholder="Image*"
                      ref={shirtsizeRef}
                      // required
                    />
                    {/* <span>*linkUrl ของรูปงานวิ่ง</span> */}
                  </div>
                </div>
                <div class="row">
                  <div class="col-6 form-group">
                    <label className="label-input100">
                      รายละเอียดงานวิ่งภาษาไทย
                    </label>
                    <textarea
                      class=" form-control"
                      name="message"
                      rows="3"
                      placeholder="รายละเอียดงานวิ่งภาษาไทย*"
                      ref={descriptionThRef}
                      required
                    ></textarea>
                    {/* <span>*รายละเอียดงานวิ่งเพิ่มเติม</span> */}
                  </div>
                  <div class="col-6 form-group">
                    <label className="label-input100">
                      รายละเอียดงานวิ่งภาษาอังกฤษ
                    </label>
                    <textarea
                      class="form-control"
                      name="message"
                      rows="3"
                      placeholder="รายละเอียดงานวิ่งภาษาอังกฤษ*"
                      ref={descriptionEnRef}
                      pattern="[A-Za-z()-_+/\,.0-9@%^&*!:;<>]*"
                      title="กรุณากรอกตัวอักษรเป็นภาษาอังกฤษ"
                      required
                    ></textarea>
                    {/* <span>*รายละเอียดงานวิ่งเพิ่มเติม</span> */}
                  </div>
                </div>
                <br />

                <div className="login100-form-btn">
                  <div className="row login100-form-btn">
                    <div className="wrap-login100-form-btn">
                      <div className="login100-form-bgbtn"></div>
                      <button className="login100-form-btn" type="submit">
                      Next
                      </button>
                    </div>
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
export default CreatedEvents;
