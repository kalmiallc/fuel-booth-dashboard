<template>
  <n-form ref="formRef" :model="formData" :rules="rules" @submit.prevent="handleSubmit">
    <!--  Username -->
    <n-form-item path="username" :show-label="false">
      <n-input
        v-model:value="formData.username"
        :input-props="{ type: 'username' }"
        placeholder="Username"
        clearable
      />
    </n-form-item>

    <!--  Email -->
    <n-form-item path="email" :show-label="false">
      <n-input
        v-model:value="formData.email"
        :input-props="{ type: 'email' }"
        placeholder="Email (optional, but the only way to rescue your prize)"
        clearable
      />
    </n-form-item>

    <n-form-item path="terms" :show-label="false">
      <n-checkbox
        v-model:checked="formData.terms"
        size="medium"
        label="I agree with the rules of the game"
      />
    </n-form-item>

    <!--  Signup submit -->
    <n-form-item :show-label="false" :show-feedback="false">
      <input type="submit" class="hidden" value="login" />
      <Btn type="primary" size="large" class="mt-2" :loading="loading" @click="handleSubmit">
        Ready, Set, Speed!
      </Btn>
    </n-form-item>
  </n-form>
</template>

<script lang="ts" setup>
import type { FormInst, FormItemRule, FormRules, FormValidationError } from 'naive-ui';
import { ValidatorErrorCode, apiError, userFriendlyMsg } from '~/lib/misc/errors';

type SignupForm = {
  username: string;
  email: string | null;
  terms?: boolean;
};

const message = useMessage();
const userStore = useUserStore();
const emit = defineEmits(['submitSuccess']);

const formRef = ref<FormInst | null>(null);
const loading = ref<boolean>(false);

const formData = ref<SignupForm>({
  username: '',
  email: null,
  terms: false,
});

const rules: FormRules = {
  email: [
    // ruleRequired('Typing in your email would definitely hit the spot :)'),
    {
      type: 'email',
      message: 'Email address is not valid',
    },
  ],
  terms: [
    {
      validator(_: FormItemRule, value: string) {
        return !!value;
      },
      message: 'Please accept the terms',
      trigger: 'change',
    },
  ],
};

function handleSubmit(e: MouseEvent | null) {
  e?.preventDefault();
  formRef.value?.validate(async (errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      errors.map(fieldErrors =>
        fieldErrors.map(error => message.warning(error.message || 'Error'))
      );
    } else {
      await register();
    }
  });
}
async function register() {
  loading.value = true;

  try {
    const res = await $api.post<UserResponse>('/users', formData.value);
    emit('submitSuccess', res.data);
  } catch (error) {
    if (isUsernameAlreadyTaken(error)) {
      const users = await userStore.getUsers();
      const user = users.find(
        item => item.email === formData.value.email && item.username === formData.value.username
      );

      if (user) {
        emit('submitSuccess', user);
      } else {
        message.error(userFriendlyMsg(error));
      }
    } else {
      message.error(userFriendlyMsg(error));
    }
  }
  loading.value = false;
}

function isUsernameAlreadyTaken(e: any) {
  const { errors } = apiError(e, false, '');
  return errors.includes(ValidatorErrorCode.PROFILE_USERNAME_ALREADY_TAKEN);
}
</script>
