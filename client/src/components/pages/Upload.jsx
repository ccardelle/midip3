import React from "react";
import api from "../../api";

class Upload extends React.Component {
  state = {
    title: "",
    joke: ""
  };

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log("this is the state prior to the submit ------ ", this.state);
    let data = {
      title: this.state.title,
      joke: this.state.joke
    };

    api
      .upload(data)
      .then(result => {
        console.log("SUCCESS! [==================== ", result);
        this.props.history.push("/"); // Redirect to the home page
      })
      .catch(err => this.setState({ message: err.toString() }));
  }

  // handleSubmit(e) {
  //   e.preventDefault()
  //   var data = {
  //     description: this.state.description
  //   }
  //   console.log("this is the data being passed -------- ", data);
  //   // Reuse of the method "addPicture" from the file '../api'
  //   api.addPicture(this.state.file, data).then(result=>{
  //     console.log("the fruits of our labor ---------- ", result)
  //   })
  // }

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
              <h2>New Joke</h2>

              <div>
                <form
                  action="/upload"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <label>Title</label>
                  <input
                    className="form-control mb-4"
                    placeholder="Insert Joke Title Here"
                    type="text"
                    name="title"
                    onChange={e => {
                      this.handleInputChange(e);
                    }}
                  />

                  <label>Joke</label>
                  <input
                    className="form-control mb-4 input-lg"
                    placeholder="Insert Joke Here"
                    type="text"
                    name="joke"
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
