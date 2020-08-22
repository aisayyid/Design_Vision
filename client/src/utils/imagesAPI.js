import axios from "axios";

export default {


getPictures: function() {
    return axios.get("/file");
  },
  galleryPictures: function(id) {
    return axios.get(`/gallerydisplay/${id}`);
  },

  createPicture: function(data, headers) {
    return axios.post("/uploadFile", data, headers);
  },
  deletePicture: function(id) {
    return axios.delete(`/gallerydelete/${id}`);
  },

}