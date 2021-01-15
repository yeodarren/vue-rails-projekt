<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'create-project-form' }"
      id="create-project-form"
      @submit.prevent="submitProject"
      data-cy="create-project-form"
    >
      <h1 v-test="{ id: 'project-title' }" class="title">Create Project</h1>
      <label v-test="{ id: 'project-label' }">Title</label>
      <input
        v-test="{ id: 'project-name' }"
        id="project-title"
        type="text"
        v-model="title"
        placeholder="Enter project title"
        data-cy="project-title"
      />
      <label v-test="{ id: 'project-label' }">Description</label>
      <textarea
        v-test="{ id: 'project-description' }"
        id="project-description"
        rows="15"
        v-model="description"
        placeholder="Enter description..."
        data-cy="project-description"
      />
      <label v-test="{ id: 'project-label' }">Upload Image</label>
      <div v-test="{ id: 'upload-actions' }" id="upload-actions">
        <input
          v-test="{ id: 'image-input' }"
          type="file"
          id="image-input"
          name="image"
          accept="image/*"
          @change="setImage"
          data-cy="image"
        />
        <button
          v-test="{ id: 'upload-button' }"
          type="button"
          class="upload-button"
          @click="upload"
          data-cy="upload-button"
        >
          Upload
        </button>
      </div>
      <div v-test="{ id: 'upload-text' }" class="upload-text" v-if="uploaded">Successfully uploaded</div>
      <select
        v-test="{ id: 'team-select' }"
        id="team"
        name="team"
        v-model="teamId"
        data-cy="team-select"
      >
        <option disabled value="">Please select team</option>
        <option
          v-for="team of $elvis('userInfo?.teams')"
          :key="team.id"
          :value="team.id"
          >{{ team.name }}</option
        >
      </select>
      <div v-test="{ id: 'buttons' }" class="buttons">
        <button
          v-test="{ id: 'submit-button' }"
          type="submit"
          class="submit-button"
        >
          Submit
        </button>
        <button
          v-test="{ id: 'return-button' }"
          class="return-button"
          @click="goBack"
        >
          Go Back
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Test from "../directives/test";
export default {
  directives: { Test },
  data() {
    return {
      title: "",
      description: "",
      teamId: "",
      image: null,
      url: "",
      uploaded: false
    };
  },
  methods: {
    ...mapActions({
      createProject: "project/createProject",
    }),
    submitProject() {
      this.createProject({
        title: this.title,
        description: this.description,
        team_id: this.teamId,
        image_url: this.url,
        image: null,
      });
    },
    setImage(event) {
      this.image = event.target.files[0];
    },
    async upload() {
      const url = "https://api.cloudinary.com/v1_1/yeodarren/image/upload";
      const fd = new FormData();
      fd.append("file", this.image);
      fd.append("upload_preset", "rtie5bbi");
      fetch(url, {
        method: "POST",
        body: fd,
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.url = data.url
          this.uploaded = true
        });
    },
    goBack() {
      this.$router.push("/profile");
    },
  },
  computed: {
    ...mapGetters({
      userInfo: "user/getUserInfo",
    }),
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;

  #create-project-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 20px 0;

    label {
      margin: 10px 0;
    }

    #project-title,
    #project-description,
    #team {
      padding: 5px;
    }
    
    #upload-actions {
      display: flex;
      align-items: center;

      #image-input {
        margin-right: 20px;
      }

      .upload-button {
        border: none;
        background-color: transparent;
        font-size: 1rem;
        cursor: pointer;
      }
    }

    .upload-text {
      margin-top: 5px;
      font-size: 0.8rem;
    }

    #team {
      width: 210px;
      margin: 10px 0;
    }

    .submit-button,
    .return-button {
      height: 40px;
      width: 100px;
      background-color: lightgreen;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1rem;
      cursor: pointer;
      margin-right: 10px;
    }
  }
}

@media (max-width: 768px) {
  .container {
    #create-project-form {
      width: 80%;

      .submit-button,
      .return-button {
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
