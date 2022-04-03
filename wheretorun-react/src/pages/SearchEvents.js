<Box sx={{ display: "flex" }}>
<Topbar />
<Sidebar />
<Box
  component="main"
  sx={{
    flexGrow: 1,
    p: 1,
    bgcolor: "#EDEEF7",
  }}
>
  <Toolbar />
  {/* categoriesevent */}
  <Container>
    <Grid
      item
      xs={12}
      // lg={12}
      spacing={2}
      container
      // sx={{
      //   bgcolor: "#EDEEF7",
      // }}
    >
      <Grid
        item
        xs={5}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            p: 2,
            mt:2,
            borderRadius: "12px",
          }}
        >
          <Grid item xs={12} spacing={1} container>
            <Container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    // mb: 2,
                    mt: 2,
                    width: "100%",
                    bgcolor: "#98BAE7",
                    color: "primary.contrastText",
                    //   boxShadow: 2,
                  }}
                  fullWidth
                >
                  <CardContent>
                    <h2>เพิ่มสภาพแวดล้อมงานวิ่ง</h2>
                  </CardContent>
                </Card>
              </Grid>
            </Container>

            <Container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    // mb: 2,
                    mt: 3,
                    width: "100%",
                    //   boxShadow: 2,
                  }}
                  fullWidth
                >
                <form>
                          <Grid container spacing={3}>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 10,
                                // mb: 2,
                                // mt: 2,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                <label>สภาพแวดล้อมงานวิ่ง (ภาษาไทย)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="สภาพแวดล้อมงานวิ่ง (ภาษาไทย)"
                              required
                              ref={environmentThRef}
                            />
                                </div>
                              </ListItem>
                            </Grid>
                            <Grid
                              item
                              xs={12}
                              sx={{
                                mr: 10,
                              }}
                            >
                              <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                    <EventIcon />
                                  </Avatar>
                                </ListItemAvatar>
                                <div className="form col-md-12 ">
                                <label>สภาพแวดล้อมงานวิ่ง (ภาษาอังกฤษ)</label>
                            <input
                              type="text"
                              className="form-control"
                              aria-describedby="emailHelp"
                              placeholder="สภาพแวดล้อมงานวิ่ง (ภาษาอังกฤษ)"
                              required
                              ref={environmentEnRef}
                            />
                                </div>
                              </ListItem>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            item
                            justifyContent="center"
                            xs={12}
                            my={2}
                          >
                            <Button
                              variant="contained"
                              color="inherit"
                              onClick={handleCancel}
                            >
                              <CancelIcon />
                              &nbsp; Cancel
                            </Button>
                            &nbsp; &nbsp; &nbsp;
                            <Button
                              variant="contained"
                              type="submit"
                              color="primary"
                              onClick={handleSubmit}
                            >
                              <SaveIcon />
                              &nbsp; save
                            </Button>
                          </Grid>
                        </form>
                </Card>
              </Grid>
              <Box
                display="flex"
                justifyContent="space-between"
                p={1.5}
                sx={{
                  p: 2,
                  mx: { xs: 2, lg: 12 },
                  mt: 2,
                  mb: 2,
                }}
              />
            </Container>
          </Grid>
        </Card>
      </Grid>
      <Grid
        item
        xs={7}
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Card
          sx={{
            p: 2,
            // mx: { xs: 2, lg: 12 },
            mt: 2,
            // mb: 12,
            borderRadius: "12px",
            // boxShadow: 10,
          }}
        >
          <Grid item xs={12} spacing={1} container>
            <Container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    mb: 2,
                    mt: 2,
                    width: "100%",
                    bgcolor: "#98BAE7",
                    color: "primary.contrastText",
                    //   boxShadow: 2,
                  }}
                  fullWidth
                >
                  <CardContent>
                    <h2>เลือกสภาพแวดล้อมของงานวิ่ง</h2>
                  </CardContent>
                </Card>
              </Grid>
            </Container>

            <Container>
              <Grid
                item
                xs={12}
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Card
                  sx={{
                    overflow: "hidden",
                    borderRadius: "12px",
                    mb: 1,
                    width: "100%",
                    //   boxShadow: 2,
                  }}
                  fullWidth
                >
                  <br />
                  <form>
                      <Grid container spacing={3}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            mr: 17,
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12 ">
                              <label>ชื่องานวิ่ง</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={eventenvironmentIdRef}
                                required
                              >
                                {/* <option value={""}>None</option> */}
                                {data.events.nodes.map((event) => (
                                  <option key={event.id} value={event.id}>
                                    {event.eventnameTh}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </ListItem>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            mr: 17,
                          }}
                        >
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <EventIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <div className="form col-md-12 ">
                              <label>สภาพแวดล้อมงานวิ่ง</label>
                              <select
                                className="form-select"
                                aria-label="Default select example"
                                ref={environmentIdRef}
                                required
                              >
                                {/* <option value={""}>None</option> */}
                                {data.environments.nodes.map((environments) => (
                                  <option
                                    key={environments.id}
                                    value={environments.id}
                                  >
                                    {environments.environmentTh}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </ListItem>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        item
                        justifyContent="center"
                        xs={12}
                        my={2}
                      >
                        {/* <Button variant="contained" color="inherit">
                          back
                        </Button>
                        &nbsp; &nbsp; &nbsp; */}
                        <Button
                          variant="contained"
                          // color="#5870cb"
                          // key={categories.id}
                          // href={`/eventgroup/${eventgroup.id}`}
                          onClick={EnvironmentSubmit}
                        >
                          <SaveIcon />
                          &nbsp;save
                        </Button>
                      </Grid>
                    </form>
                </Card>
              </Grid>
              <Box display="flex" justifyContent="space-between" p={1.5}>
                  <Link to="/createdCategoryEvent">
                    <Button size="large" color="primary">
                      <ArrowBackIcon />
                      &nbsp;back
                    </Button>
                  </Link>
                  <Link to="/edit">
                    <Button size="large" color="primary">
                      <DoneIcon />
                      &nbsp; finish
                    </Button>
                  </Link>
                </Box>
            </Container>
          </Grid>

          {/* endประเภทหมวดหมู่งานวิ่ง */}
        </Card>
      </Grid>
    </Grid>
  </Container>
  <Container>
    <Card
      sx={{
        p: 2,
        // mx: { xs: 2, lg: 12 },
        mt: 2,
        // mb: 12,
        borderRadius: "12px",
        // boxShadow: 10,
        // bgcolor: "#EDEEF7",
      }}
    >
      <Grid
        item
        xs={12}
        // lg={12}
        spacing={1}
        container
      >
        <Container>
          <Grid
            item
            xs={8}
            // container
            // direction="row"
            justifyContent="center"
            alignItems="center"
            
          >
            <Card
              sx={{
                overflow: "hidden",
                borderRadius: "12px",
                mb: 2,
                mt: 2,
                width: "100%",
                bgcolor: "#98BAE7",
                color: "primary.contrastText",
                //   boxShadow: 2,
              }}
              fullWidth
            >
              <CardContent>
                <h2>ตารางสภาพแวดล้อมของงานวิ่ง</h2>
              </CardContent>
            </Card>
          </Grid>
        </Container>

        <Container>
          <Grid
            item
            xs={12}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              sx={{
                overflow: "hidden",
                borderRadius: "12px",
                mb: 4,
                width: "100%",
                //   boxShadow: 2,
              }}
              className={classes.root}
              fullWidth
            >
            <Paper className={classes.root}>
                      <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <div>
                                  <h6>ชื่องานวิ่ง</h6>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div>
                                  <h6>สภาพแวดล้อมงานวิ่ง</h6>
                                </div>
                              </TableCell>

                              <TableCell align="center">
                                <div>
                                  <h6>Action</h6>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {data.environmentevents.nodes
                              .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                              )
                              .map((environmentevents) => (
                                <TableRow hover role="checkbox" tabIndex={-1}>
                                  <TableCell align="left">
                                    <div>
                                      <h6>
                                        {environmentevents.event.eventnameTh}
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell>
                                    <div>
                                      <h6>
                                        {
                                          environmentevents.environment
                                            .environmentTh
                                        }
                                      </h6>
                                    </div>
                                  </TableCell>
                                  <TableCell align="center">
                                    <Link
                                      to={`/editEnvironmentEvent/${environmentevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="inherit"
                                        key={environmentevents.id}
                                        // href={`/eventgroup/${eventgroup.id}`}
                                        // onClick={EdittoggleModal}
                                      >
                                        <EditIcon />
                                        &nbsp;Edit
                                      </Button>
                                    </Link>
                                    &nbsp; &nbsp; &nbsp;
                                    <Link
                                      to={`/delEnvironmentEvent/${environmentevents.id}`}
                                    >
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        key={environmentevents.id}
                                        // onClick={toggleModal}
                                      >
                                        <DeleteIcon />
                                        &nbsp; Delete
                                      </Button>
                                    </Link>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[
                          5,
                          10,
                          25,
                          { label: "All", value: -1 },
                        ]}
                        // rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={data.environmentevents.totalCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </Paper>
            </Card>
          </Grid>
        </Container>
      </Grid>
    </Card>
  </Container>
</Box>
</Box>