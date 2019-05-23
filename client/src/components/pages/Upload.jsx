import React from "react";
import api from "../../api";

class Upload extends React.Component {
  state = {
    name: "",
    description: "",
    file: ""
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    let data = {
      name: this.state.name,
      description: this.state.description

      // password: this.state.password
    };

    api
      .upload(data)
      .then(result => {
        console.log("SUCCESS!");
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  // componentDidMount() {
  //   api
  //     .getSecret()
  //     .then(data => this.setState({ secret: data.secret }))
  //     .catch(err => this.setState({ message: err.toString() }));
  // }

  render() {
    return (
      <div className="container">
        <div className="card border-0 shadow my-5 home-container">
          <div className="card-body p-5">
            <div className="">
              <h2>Upload</h2>

              <div>
                <form
                  action="/upload"
                  method="POST"
                  enctype="multipart/form-data"
                >
                  <label>Name</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="name"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Description</label>
                  <input
                    className="form-control mb-4"
                    type="text"
                    name="description"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Midi File (.mid only)</label>
                  <input
                    className="form-control mb-4"
                    type="file"
                    name="midi-file"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <button
                    className="btn btn-info btn-block my-4 btncolors"
                    onClick={e => this.handleClick(e)}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>

            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default Upload;
