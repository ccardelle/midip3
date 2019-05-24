const config = require("../configs/config.json");

const stream = require("stream");
const axios = require("axios");
const AWS = require("aws-sdk");

class S3RemoteUploader {
  constructor(remoteAddr) {
    this.remoteAddr = remoteAddr;
    this.stream = stream;
    this.axios = axios;
    this.config = config;
    this.AWS = AWS;
    this.AWS.config.update({
      accessKeyId: this.config.api_key,
      secretAccessKey: this.config.api_secret
    });
    this.spacesEndpoint = new this.AWS.Endpoint(this.config.endpoint);
    this.s3 = new this.AWS.S3({ endpoint: this.spacesEndpoint });
    this.file_name = this.remoteAddr.substring(
      this.remoteAddr.lastIndexOf("/") + 1
    );
    this.obj_key = this.config.subfolder + "/" + this.file_name;
    this.content_type = "application/octet-stream";
    this.uploadStream();
  }
  uploadStream() {
    const pass = new this.stream.PassThrough();
    this.promise = this.s3
      .upload({
        Bucket: this.config.bucket,
        Key: this.obj_key,
        ACL: this.config.s3.acl,
        Body: pass,
        ContentType: this.content_type
      })
      .promise();
    return pass;
  }
  initiateAxiosCall() {
    return axios({
      method: "get",
      url: this.remoteAddr,
      responseType: "stream"
    });
  }
  async dispatch() {
    await this.initiateAxiosCall().then(response => {
      if (response.status === 200) {
        this.content_type = response.headers["content-type"];
        response.data.pipe(this.uploadStream());
      }
    });
    return this.promise;
  }
}
module.exports = {
  S3RemoteUploader: S3RemoteUploader
};
