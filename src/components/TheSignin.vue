<template>
  <div id="container">
    <ion-title>Sign-In</ion-title>
    <form action="">
      <ion-grid fixed>
        <ion-row class="ion-align-items-center ion-text-center">
          <ion-col size="12">
            <ion-input
              v-model="emailInput"
              label="E-mail"
              ref="emailRef"
              type="email"
              label-placement="floating"
              placeholder="example@mail.com"
              error-text="Invalid email"
              debounce="700"
              @ionInput="
                validateEmail();
                markEmailTouched();
              "
            ></ion-input>
          </ion-col>
          <ion-col size="12">
            <ion-input
              v-model="passwordInput"
              label="Password"
              ref="passwordRef"
              type="password"
              label-placement="floating"
              placeholder="Type Your Password"
              error-text="Password Can't Be less than 3 characters"
              debounce="700"
              @ionInput="
                validatePassword();
                markPasswordTouched();
              "
            ></ion-input>
          </ion-col>
          <ion-button
            @click.prevent="authenticateUser"
            id="open-loading"
            class="login-btn"
            :disabled="invalidForm"
          >
            Sign-In
          </ion-button>
        </ion-row>
      </ion-grid>
    </form>
  </div>
</template>

<script>
import {
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonTitle,
  IonItem,
  IonText,
  IonButton,
  IonLoading,
} from "@ionic/vue";

export default {
  name: "TheSignin",
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonTitle,
    IonItem,
    IonText,
    IonButton,
    IonLoading,
  },

  data() {
    return {
      emailInput: "",
      emailInputError: true,
      passwordInput: "",
      passwordInputError: true,
      emailRegexPattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      loading: false,
    };
  },

  computed: {
    invalidForm() {
      return this.emailInputError === true || this.passwordInputError === true;
    },
  },

  methods: {
    async authenticateUser() {
      await this.$store.dispatch("authModule/userAuth", {
        email: this.emailInput,
        password: this.passwordInput,
      });
      this.$router.push('/dashboard');
    },

    validateEmail() {
      if (this.emailInput === "") return;

      if (this.$refs.emailRef) {
        this.$refs.emailRef.$el.classList.remove("ion-valid");
        this.$refs.emailRef.$el.classList.remove("ion-invalid");

        if (this.emailRegexPattern.test(this.emailInput)) {
          this.$refs.emailRef.$el.classList.add("ion-valid");
          this.emailInputError = false;
        } else {
          this.emailInputError = true;
          this.$refs.emailRef.$el.classList.add("ion-invalid");
        }
      }
    },

    validatePassword() {
      if (this.passwordInput === "") return;

      if (this.$refs.passwordRef) {
        this.$refs.passwordRef.$el.classList.remove("ion-valid");
        this.$refs.passwordRef.$el.classList.remove("ion-invalid");

        if (this.passwordInput.length < 3) {
          this.passwordInputError = true;
          this.$refs.passwordRef.$el.classList.add("ion-invalid");
        } else {
          this.passwordInputError = false;
          this.$refs.passwordRef.$el.classList.add("ion-valid");
        }
      }
    },

    markEmailTouched() {
      this.$refs.emailRef.$el.classList.add("ion-touched");
    },

    markPasswordTouched() {
      this.$refs.passwordRef.$el.classList.add("ion-touched");
    },
  },
};
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
ion-grid {
  --ion-grid-width: 50%;

  --ion-grid-width-xs: 50%;
  --ion-grid-width-sm: 288px;
  --ion-grid-width-md: 400px;
  --ion-grid-width-lg: 480px;
  --ion-grid-width-xl: 570px;
}
</style>
