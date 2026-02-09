<script setup>
import { ref, watch, computed } from 'vue';
const toast = useToast()

const UInput = resolveComponent('UInput');
const UCheckbox = resolveComponent('UCheckbox');
const UCheckboxGroup = resolveComponent('UCheckboxGroup');
const URadioGroup = resolveComponent('URadioGroup');
const USelectMenu = resolveComponent('USelectMenu');
const UTextarea = resolveComponent('UTextarea');
const UFileUpload = resolveComponent('UFileUpload');
const UInputMenu = resolveComponent('UInputMenu');
const UInputTags = resolveComponent('UInputTags');
const UPinInput = resolveComponent('UPinInput');
const USwitch = resolveComponent('USwitch');

// --- Props and Emits ---
const props = defineProps({
  formFields: { type: Array, required: true, default: () => [] },
  bindValues: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Submit' },
  notify: { type: Boolean, default: false },
  showSubmitButton: { type: Boolean, default: false },
  variant: { type: String, default: 'outline' },
  class: { type: String, default: '' },
});

const emit = defineEmits(['submit', 'update:modelValue', "validForm"]);

// --- State and Initialization ---
const formData = ref({});
const touched = ref({});
const errors = ref({}); // Track errors locally
const loading = ref(false);
const disabled = ref(false);

function getFieldComponent(type) {
  const componentMap = {
    textarea: UTextarea,
    date: UInput,
    time: UInput,
    select: USelectMenu,
    checkbox: UCheckbox,
    checkboxGroup: UCheckboxGroup,
    radio: URadioGroup,
    ufile: UFileUpload,
    inputMenu: UInputMenu,
    inputTags: UInputTags,
    pinInput: UPinInput,
    switch: USwitch,
  };
  return componentMap[type] || UInput;
}

// Watch for changes in formFields or bindValues to initialize formData
watch(() => [props.formFields, props.bindValues], () => {
  const initialData = {};
  props.formFields?.forEach((field) => {
    const hasBoundValue = props.bindValues && Object.prototype.hasOwnProperty.call(props.bindValues, field.name);
    let initialValue;

    if (hasBoundValue) {
      initialValue = props.bindValues[field.name];
    } else {
      switch (field.type) {
        case 'checkbox': case 'toggle': initialValue = false; break;
        case 'select': initialValue = null; break;
        default: initialValue = '';
      }
    }
    initialData[field.name] = initialValue;
  });
  formData.value = initialData;
}, { immediate: true, deep: true });

// --- Validation Logic ---
const validateField = (field, value) => {
  if (field.required && (value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0))) {
    return 'This field is required';
  }

  // Regex / Pattern check
  if (value && (field.pattern || field.regex)) {
    const pattern = new RegExp(field.pattern || field.regex);
    if (!pattern.test(value)) {
      return field.errorMessage || 'Invalid format';
    }
  }
  return null;
};

// Validate all fields and return status
const validateForm = () => {
  const newErrors = {};
  let isValid = true;

  props.formFields.forEach(field => {
    const error = validateField(field, formData.value[field.name]);
    if (error) {
      newErrors[field.name] = error;
      isValid = false;
    }
  });

  errors.value = newErrors;
  emit('validForm', isValid);
  return isValid;
};

// --- Computed Validity for Button ---
const isFormValid = computed(() => {
  // We can do a lightweight check or just rely on validateForm during submit
  // Here lets do a check without setting errors visible yet
  return props.formFields.every((field) => {
    const error = validateField(field, formData.value[field.name]);
    return !error;
  });
});


// --- Event Handlers ---
const onSubmit = () => {
  loading.value = true;
  disabled.value = true;

  touched.value = props.formFields.reduce((acc, field) => ({ ...acc, [field.name]: true }), {}); // Mark all as touched

  if (validateForm()) {
    emit('submit', formData.value);
    if (props.notify) toast.add({ title: 'Form submitted successfully', color: 'success' });
  } else {
    console.error('Form is invalid.', errors.value);
    if (props.notify) toast.add({ title: 'Please correct the errors in the form.', color: 'error' });
  }

  loading.value = false;
  disabled.value = false;
};

// Watch for changes to clear errors real-time
watch(formData, (newVal) => {
  emit('update:modelValue', newVal);

  // Real-time validation for touched fields
  Object.keys(newVal).forEach(key => {
    if (touched.value[key]) {
      const field = props.formFields.find(f => f.name === key);
      if (field) {
        const error = validateField(field, newVal[key]);
        if (error) errors.value[key] = error;
        else delete errors.value[key];
      }
    }
  });

}, { deep: true });

const handleBlur = (fieldName) => {
  touched.value[fieldName] = true;
  const field = props.formFields.find(f => f.name === fieldName);
  if (field) {
    const error = validateField(field, formData.value[fieldName]);
    if (error) errors.value[fieldName] = error;
    else delete errors.value[fieldName];
  }
}

</script>

<template>
  <div class="relative">
    <div class="flex flex-col" :class="class">
      <slot name="before" />
      <div v-for="field in formFields" :key="field.name" class="relative group">
        <UFormField :label="field.label" :name="field.name" :required="field.required" :description="field.description"
          :hint="field.hint" :help="field.help" :error="errors[field.name]" class="transition-all duration-300">

          <component :is="getFieldComponent(field.type)" v-model="formData[field.name]" size="xl" :variant="variant"
            :placeholder="field.placeholder || `Enter ${field.label}`" :chip="field.chip || false" v-bind="field"
            :loading="loading" :disabled="disabled" loading-icon="i-lucide-loader"
            :class="[field.class || 'w-full', errors[field.name] ? 'ring-red-500/50' : '']"
            @blur="handleBlur(field.name)">

            <template v-if="formData[field.name] && field.clearable" #trailing>
              <UButton color="neutral" variant="link" size="md" icon="i-lucide-circle-x" aria-label="Clear input"
                @click="formData[field.name] = ''" />
            </template>

            <template v-if="field.maxLength" #trailing>
              <div id="character-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                {{ formData[field.name]?.length }}/{{ field.maxLength }}
              </div>
            </template>
          </component>

        </UFormField>
      </div>

      <slot name="after" />

    </div>
    <div class="mt-8">
      <button v-if="props.showSubmitButton" @click="onSubmit"
        class="flex items-center justify-center gap-3 w-full font-bold rounded-xl px-6 py-4 text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl relative overflow-hidden group"
        :class="isFormValid ? 'bg-gradient-to-r from-sakal-primary to-rose-600 text-white cursor-pointer' : 'bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500 dark:border-gray-300 dark:border'"
        :disabled="!isFormValid">
        <span
          class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
        <Icon name="i-heroicons-arrow-right-circle-solid" size="24" class="relative z-10" />
        <span class="relative z-10">{{ submitLabel }}</span>
      </button>
    </div>
  </div>
</template>
