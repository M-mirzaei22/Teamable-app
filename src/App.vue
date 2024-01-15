<template>
  <div v-show="!isEditMode">
    <h1>User profile</h1>
    <img src="./image_2698710.jpg" />

    <span>Name: </span><b id="name">{{ name }}</b>
    <hr />

    <span>Email: </span><b id="email">{{ email }}</b>
    <hr />

    <span>Interests : </span><b id="interests">{{ interests }}</b>
    <hr />

    <button v-on:click.native="editProfile">Edit Profile</button>
  </div>

  <div v-show="isEditMode">
    <h1>User profile</h1>
    <img src="./image_2698710.jpg" />

    <span>Name: </span>
    <input type="text" id="input-name" v-model="name" />
    <hr />

    <span>Email: </span>
    <input type="text" id="input-email" v-model="email" />
    <hr />

    <span>Interests : </span>
    <input type="text" id="input-interests" v-model="interests" />
    <hr />

    <button v-on:click.native="updateProfile">Update Profile</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      name: "",
      email: "",
      interests: "",
      isEditMode: false,
    };
  },
  async created() {
    const userData = await this.fetchUserProfile();
    this.name = userData.name;
    this.email = userData.email;
    this.interests = userData.interests;
  },
  methods: {
    editProfile() {
      this.isEditMode = true;
    },

    async updateProfile() {
      const payload = {
        name: this.name,
        email: this.email,
        interests: this.interests,
      };
      const resJson = await this.updateUserProfile(payload);
      console.log(resJson);

      this.isEditMode = false;
    },

    async fetchUserProfile() {
      const res = await fetch("get-profile");
      return await res.json();
    },
    async updateUserProfile(payload) {
      const res = await fetch("update-profile", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      return await res.json();
    },
  },
};
</script>

<style>
img {
  width: 340px;
  height: 260px;
  display: block;
  margin-bottom: 40px;
}
div {
  margin: 40px auto;
  width: 80%;
}

hr {
  width: 400px;
  margin: 25px 0;
}

button {
  width: 160px;
  font-size: 15px;
  height: 45px;
  border-radius: 5px;
}

button:hover {
  cursor: pointer;
}

input {
  width: 200px;
  font-size: 15px;
  padding: 10px;
}
</style>
