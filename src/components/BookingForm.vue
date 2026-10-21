<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps<{ services: string[] }>();

const formKey = 'padel-booking';
const schemaRef = 'v1_6edc42ab0758';

const form = ref({
  name: '',
  phone: '',
  service: props.services[0] ?? '',
  message: ''
});

const status = ref<'idle' | 'loading' | 'done' | 'error'>('idle');
const errorText = ref('');

function onSubmit(event: Event) {
  event.preventDefault();
  if (status.value === 'loading') return;
  status.value = 'loading';
  errorText.value = '';

  fetch('/__forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      formKey,
      schemaRef,
      payload: {
        name: form.value.name,
        phone: form.value.phone,
        service: form.value.service,
        message: form.value.message
      }
    })
  })
    .then(async (response) => {
      if (!response.ok) throw new Error('bad response');
      status.value = 'done';
      form.value = { name: '', phone: '', service: props.services[0] ?? '', message: '' };
    })
    .catch(() => {
      status.value = 'error';
      errorText.value = 'Не получилось отправить заявку. Попробуйте ещё раз или позвоните нам.';
    });
}
</script>

<template>
  <div>
    <form v-if="status !== 'done'" class="flex flex-col gap-4" novalidate @submit="onSubmit">
      <div class="grid gap-4 sm:grid-cols-2">
        <label class="flex flex-col gap-2">
          <span class="eyebrow text-bone-dim">Имя</span>
          <input
            v-model="form.name" name="name" type="text" required
            minlength="2" maxlength="100"
            placeholder="Как к вам обращаться"
            class="border border-ink-line bg-ink px-4 py-3 text-bone placeholder:text-bone-dim/60 focus:border-lime focus:outline-none"
          />
        </label>
        <label class="flex flex-col gap-2">
          <span class="eyebrow text-bone-dim">Телефон</span>
          <input
            v-model="form.phone" name="phone" type="tel" required
            placeholder="+7 (___) ___-__-__"
            class="border border-ink-line bg-ink px-4 py-3 text-bone placeholder:text-bone-dim/60 focus:border-lime focus:outline-none"
          />
        </label>
      </div>
      <label class="flex flex-col gap-2">
        <span class="eyebrow text-bone-dim">Что интересует</span>
        <select
          v-model="form.service" name="service"
          class="border border-ink-line bg-ink px-4 py-3 text-bone focus:border-lime focus:outline-none"
        >
          <option v-for="item in services" :key="item" :value="item">{{ item }}</option>
        </select>
      </label>
      <label class="flex flex-col gap-2">
        <span class="eyebrow text-bone-dim">Комментарий</span>
        <textarea
          v-model="form.message" name="message" rows="4" maxlength="1000"
          placeholder="Удобное время, уровень игры, количество человек"
          class="resize-none border border-ink-line bg-ink px-4 py-3 text-bone placeholder:text-bone-dim/60 focus:border-lime focus:outline-none"
        ></textarea>
      </label>
      <p v-if="status === 'error'" class="text-sm text-clay">{{ errorText }}</p>
      <button type="submit" class="btn-lime mt-2 w-full" :disabled="status === 'loading'">
        <template v-if="status === 'loading'">Отправляем…</template>
        <template v-else>
          Отправить заявку
          <Icon icon="lucide:send" class="h-5 w-5" />
        </template>
      </button>
      <p class="text-xs text-bone-dim">
        Нажимая кнопку, вы соглашаетесь на обработку заявки. Мы перезвоним, чтобы подтвердить время.
      </p>
    </form>

    <div v-else class="flex h-full flex-col items-start justify-center gap-5 border border-lime bg-ink p-8">
      <span class="flex h-14 w-14 items-center justify-center bg-lime text-ink">
        <Icon icon="lucide:check" class="h-7 w-7" />
      </span>
      <h3 class="display-xl text-2xl">Заявка отправлена</h3>
      <p class="max-w-sm text-sm text-bone-dim">
        Спасибо! Мы свяжемся с вами, уточним удобное время и забронируем корт.
      </p>
      <button type="button" class="btn-ghost" @click="status = 'idle'">Отправить ещё одну</button>
    </div>
  </div>
</template>
