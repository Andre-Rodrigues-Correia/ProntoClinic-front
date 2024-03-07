

const userService = {
  getToken(){
    return localStorage.getItem('token');
  },
  getPayloadToken(token){
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const payload = JSON.parse(atob(base64));
    return payload
  },
  async setClinicAndDoctorId(store){
    const token = this.getToken()
    const payloadToken = this.getPayloadToken(token);
    console.log(payloadToken)
    
    await store.dispatch('doctor/setDoctor', payloadToken._id);

    await store.dispatch('clinic/setClinic', payloadToken.clinicId);

  },
  getClinicId(){
    const token = this.getToken();
    const payloadToken = this.getPayloadToken(token);

    return payloadToken.clinicId;
  },
  getDoctorId(){
    const token = this.getToken();
    const payloadToken = this.getPayloadToken(token);

    return payloadToken._id;
  }
};

export default userService;
