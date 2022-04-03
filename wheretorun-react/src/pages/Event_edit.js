import React from "react";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { Link } from "react-router-dom";

const eventsQuery = loader("../graphql/queries/events.gql");

const Event_edit = () => {
  const { error, loading, data } = useQuery(eventsQuery);

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
            Welcome to <span>Whrertorun</span>
          </h1>
          <h2>
            We are team of talented designers making websites with Bootstrap
          </h2>
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

      <section id="featured-services" class="featured-services">
        <div class="container" data-aos="fade-up">
          <div class="row">
            {/* <div class="col-md-6 col-lg-4 d-flex align-items-stretch mb-5 mb-lg-0">
              <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
                <div class="icon">
                  <i class="bx bxl-dribbble"></i>
                </div>
                <h4 class="title">
                  <a href="">Lorem Ipsum</a>
                </h4>
                <p class="description">
                  Voluptatum deleniti atque corrupti quos dolores et quas
                  molestias excepturi
                </p>
              </div>
            </div> */}
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
                
                <div class="card-body">
                  <Link to={`/event/${events.id}`}>
                  <h5 class="card-title">{events.eventnameTh}</h5>
                  <p class="card-text">
                    <i class="fa fa-calendar" style={{ fontsize: "24px" }}></i>
                    &nbsp;&nbsp; {events.startdate} - {events.enddate}
                  </p>
                  <p class="card-text">
                    <i class="bx bx-map" style={{ fontsize: "24px" }}></i>
                    &nbsp;&nbsp;สถานที่ : {events.locationTh}{" "}
                    {events.provinceTh}
                  </p>
                  <p class="card-text">
                    <i class="fa fa-calendar" style={{ fontsize: "24px" }}></i>{" "}
                    &nbsp;&nbsp;จัดโดย : {events.organizer}
                  </p><br/>
                  </Link>
                  <a href="#" class="btn btn-primary">Edit</a>
                </div>
                
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
};

export default Event_edit;
