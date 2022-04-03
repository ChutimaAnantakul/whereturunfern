import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

const searchEventnameQuery = loader("../graphql/queries/searchEvents.gql");

const Home = () => {
  const inputRef = useRef();
  // const inputhashtagRef = useRef();
  const [eventnameTh, seteventName] = useState("");

  const { error, loading, data } = useQuery(searchEventnameQuery, {
    variables: {
      eventnameTh,
    },
  });
  if (loading) {
    return "loading...";
  }
  if (error) {
    return "error";
  }

  return (
    <>
      <section id="hero" class="d-flex align-items-center">
        <div class="container" data-aos="zoom-out" data-aos-delay="100">
          <h1>
            Welcome to <span>Where to run</span>
          </h1>
          {/* <h2>
            We are team of talented designers making websites with Bootstrap
          </h2> */}
          <div class="d-flex">
            <a href="#about" class="btn-get-started scrollto">
              Get Started
            </a>
            <a
              href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
              class="glightbox btn-watch-video"
            >
              <i class="bi bi-play-circle"></i>
              <span>Watch Video</span>
            </a>
          </div>
        </div>
      </section>

      <main id="main" />

      <footer id="footer">
        <div class="footer-newsletter">
          <div class="container">
            <form action="" method="post">
              <div class="row">
                <div class="col-lg-4">
                  <div className="wrap-input100 validate-input m-b-4 mt-4">
                    <span className="label-input100">ชื่องานวิ่ง</span>
                    <input
                      className="input100"
                      type="text"
                      ref={inputRef}
                      placeholder={eventnameTh}
                      // value={eventnameTh}
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div className="wrap-input100 validate-input m-b-4 mt-4">
                    <span className="label-input100">จังหวัด</span>
                    <select
                      className=" input100"
                      type="text"
                      placeholder="Type your gender"
                      aria-label="Default select example"
                    >
                      <option>ค้นหาด้วยชื่อจังหวัด</option>
                      {data.provinces.nodes.map((province) => (
                        <option key={province.id} value={province.provinceTh}>
                          {province.provinceTh}
                        </option>
                      ))}
                    </select>
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div className="wrap-input100 validate-input m-b-4 mt-4">
                    <span className="label-input100">ระยะทาง</span>
                    <select
                      className=" input100"
                      type="text"
                      placeholder="Type your gender"
                      aria-label="Default select example"
                    >
                      <option>ค้นหาด้วยระยะทาง</option>
                      <option>1-9 km.</option>
                      <option>10-20 km.</option>
                      <option>21-41 km.</option>
                      <option>42 km. ขึ้นไป</option>
                    </select>
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
              </div>
              {/* <hr /> */}
              <div class="row">
                <div class="col-lg-4">
                  <div className="wrap-input100 validate-input m-b-24 mt-4">
                    <span className="label-input100">หมวดหมู่</span>
                    <select
                      className=" input100"
                      type="text"
                      placeholder="Type your gender"
                      aria-label="Default select example"
                    >
                      <option>ค้นหาด้วยหมวดหมู่งานวิ่ง</option>
                      {data.categories.nodes.map((categories) => (
                        <option key={categories.id} value={categories.categorynameTh}>
                          {categories.categorynameTh}
                        </option>
                      ))}
                    </select>
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div className="wrap-input100 validate-input m-b-4 mt-4">
                    <span className="label-input100">สภาพแวดล้อม</span>
                    <select
                      className=" input100"
                      type="text"
                      placeholder="Type your gender"
                      aria-label="Default select example"
                    >
                      <option>ค้นหาด้วยสภาพแวดล้อมงานวิ่ง</option>
                      {data.environments.nodes.map((environments) => (
                        <option key={environments.id} value={environments.environmentTh}>
                          {environments.environmentTh}
                        </option>
                      ))}
                    </select>
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div className="wrap-input100 validate-input m-b-4 mt-4">
                    <span className="label-input100">#แฮชแท็ก</span>
                    <input
                      className="input100"
                      type="text"
                      placeholder="ค้นหาด้วยแฮชแท็ก"
                    />
                    <span
                      className="focus-input100"
                      data-symbol="&#xf2c3;"
                    ></span>
                  </div>
                </div>
              </div>
              <input
                type="submit"
                value="Search"
                onClick={() => seteventName(inputRef.current.value)}
              />
            </form>
          </div>
        </div>
      </footer>

      <section id="services" class="services">
        <div class="container" data-aos="fade-up">
          <div class="section-title"></div>

          <div class="row">
            {data.events.nodes.map((events) => (
              <div
                class=" col-md-6 col-lg-4"
                style={{ width: "18rem" }}
                key={events.id}
              >
                <Link to={`/event/${events.id}`}>
                  <img
                    class="card-img-top"
                    style={{
                      width: "100%",
                      height: "10vw",
                      objectfit: "cover",
                    }}
                    src={events.coverphotourl}
                    alt="Card image cap"
                  />
                </Link>
                <Link to={`/event/${events.id}`}>
                  <div class="card-body">
                    <h5 class="card-title">{events.eventnameTh}</h5>
                    <p class="card-text">
                      <i
                        class="fa fa-calendar"
                        style={{ fontsize: "24px" }}
                      ></i>
                      &nbsp;&nbsp; {events.startdate} - {events.enddate}
                    </p>
                    <p class="card-text">
                      <i class="bx bx-map" style={{ fontsize: "24px" }}></i>
                      &nbsp;&nbsp;สถานที่ : {events.locationTh}{" "}
                      {events.province.provinceTh}
                    </p>
                    <p class="card-text">
                      <i
                        class="fa fa-calendar"
                        style={{ fontsize: "24px" }}
                      ></i>{" "}
                      &nbsp;&nbsp;จัดโดย : {events.organizer}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
