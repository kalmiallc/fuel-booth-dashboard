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
import { userFriendlyMsg } from '~/lib/misc/errors';

type SignupForm = {
  username: string;
  email: string;
  terms?: boolean;
};

const { t } = useI18n();
const message = useMessage();
const user = useUserStore();
const emit = defineEmits(['submitSuccess']);

const formRef = ref<FormInst | null>(null);
const loading = ref<boolean>(false);

const formData = ref<SignupForm>({
  username: user.username,
  email: user.email,
  terms: false,
});

const rules: FormRules = {
  email: [
    ruleRequired(t('validation.emailRequired')),
    {
      type: 'email',
      message: t('validation.email'),
    },
  ],
  terms: [
    {
      validator(_: FormItemRule, value: string) {
        return !!value;
      },
      message: t('validation.terms'),
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
    user.setUser(res.data);

    message.success('User created');
    emit('submitSuccess');
  } catch (error) {
    message.error(userFriendlyMsg(error));
  }
  loading.value = false;
}
</script>
