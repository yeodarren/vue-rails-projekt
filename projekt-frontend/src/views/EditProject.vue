<template>
  <div v-test="{ id: 'container' }" class="container">
    <form
      v-test="{ id: 'edit-project-form' }"
      @submit.prevent="editProject"
      id="edit-project-form"
      data-cy="edit-project-form"
    >
      <h1 v-test="{ id: 'edit-project-title' }" class="edit-project-title">
        Edit project
      </h1>
      <label v-test="{ id: 'edit-project-label' }">Title</label>
      <input
        v-test="{ id: 'edit-project-name' }"
        type="text"
        :value="$elvis('project?.project?.title')"
        @input="updateTitle($event)"
        id="project-title"
        data-cy="project-title"
      />
      <label v-test="{ id: 'edit-project-label' }">Description</label>
      <textarea
        v-test="{ id: 'edit-project-description' }"
        type="text"
        rows="15"
        :value="$elvis('project?.project?.description')"
        @input="updateDescription($event)"
        id="project-description"
        data-cy="project-description"
      />
      <label v-test="{ id: 'edit-project-label' }">Upload Image</label>
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
      <div v-test="{ id: 'upload-text' }" class="upload-text" v-if="uploaded" >Successfully uploaded</div>
      <div v-test="{ id: 'buttons' }" class="buttons">
        <button v-test="{ id: 'submit-button' }" type="submit" class="submit-button">Edit</button>
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
      // id: this.$route.params.id,
      image: null,
      url: this.project.project.image_url,
      uploaded: false
    };
  },
  methods: {
    ...mapActions({
      updateProjectTitle: "project/updateTitle",
      updateProjectDescription: "project/updateDescription",
      updateProject: "project/updateProject",
    }),
    setImage(event) {
      if(event){
        this.image = event.target.files[0];
      }
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
    updateTitle(event) {
      this.updateProjectTitle(event.target.value);
    },
    updateDescription(event) {
      this.updateProjectDescription(event.target.value);
    },
    editProject() {
      this.updateProject({
        id: this.project.project.id,
        title: this.project.project.title,
        description: this.project.project.description,
        image_url: this.url
        // team_id: this.project.team.id,
        // user_id: this.project.user.id
      });
    },
    goBack() {
      this.$router.push("/profile");
    },
  },
  computed: {
    ...mapGetters({
      project: "project/getProjectDetails",
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

  #edit-project-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin: 20px 0;

    label {
      margin: 10px 0;
    }

    #project-title,
    #project-description {
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
      margin-top: 10px;
      margin-right: 10px;
    }
  }
}

@media (max-width: 768px) {
  .container {
    #edit-project-form {
      width: 80%;
      .button {
        .submit-button,
        .return-button {
          width: 100%;
        }
      }
    }
  }
}
</style>
