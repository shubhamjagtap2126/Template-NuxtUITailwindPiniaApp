<script setup>
import { ref, watch, computed } from 'vue'; // Import core Vue functions
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
  formFields: { type: Array, required: true, default: () => [] }, // Array of field definitions
  bindValues: { type: Object, default: () => ({}) }, // Initial values to bind
  submitLabel: { type: String, default: 'Submit' }, // Label for the submit button
  notify: { type: Boolean, default: false }, // Whether to show a notification on submit
  showSubmitButton: { type: Boolean, default: false }, // Whether to display the submit button
  variant: { type: String, default: 'outline' }, // Variant for the submit button
  class: { type: String, default: '' }, // Class for the form
});

const emit = defineEmits(['submit', 'update:modelValue']); // Define emitted events

// --- State and Initialization ---
const formData = ref({}); // Reactive model for all form field values
const loading = ref(false);
const disabled = ref(false);
// Map field type strings to the actual Nuxt UI component name
function getFieldComponent(type) {

  const componentMap = {
    textarea: UTextarea,
    date: UInput,
    time: UInput,
    select: USelectMenu,
    checkbox: UCheckbox,
    checkboxGroup: UCheckboxGroup,
    radio: URadioGroup,
    file: UFileUpload,
    inputMenu: UInputMenu,
    inputTags: UInputTags,
    pinInput: UPinInput,
    switch: USwitch,
  };
  return componentMap[type] || UInput; // Return component name or fallback
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
        default: initialValue = ''; // Default to empty string
      }
    }
    initialData[field.name] = initialValue;
  });
  formData.value = initialData; // Update form data
}, { immediate: true, deep: true });

// --- Validation and Rules ---
const isFormValid = computed(() => {
  return props.formFields.every((field) => {
    if (!field.required) return true;
    const value = formData.value[field.name];
    const isFalsy = value === null || value === undefined || value === '' || (Array.isArray(value) && value.length === 0);
    return !isFalsy; // Check if required field has a truthy value
  });
});

// --- Event Handlers ---
const onSubmit = () => {
  loading.value = true;
  disabled.value = true;
  // add delay of 5 sec
  if (isFormValid.value) {
    // new Promise((resolve) => setTimeout(resolve, 5000));
    emit('submit', formData.value); // Emit form data on successful submission
    // console.log('Form Submitted:', formData.value);
    props.notify && toast.add({ title: 'Form submitted successfully', color: 'success' });
  } else {
    console.error('Form is invalid. Check required fields.'); // Log error for invalid form
    props.notify && toast.add({ title: 'Form is invalid. Check required fields.', color: 'danger' });
  }
  loading.value = false;
  disabled.value = false;
};

// Watch for any change in formData and emit it up to the parent
watch(formData, (newVal) => {
  emit('update:modelValue', newVal);
}, { deep: true });
</script>

<template>
  <div>
    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> -->
    <div class="gap-4" :class="class">
      <slot name="before" />
      <div v-for="field in formFields" :key="field.name">
        <UFormField :label="field.label" :name="field.name" :required="field.required" :description="field.description"
          :hint="field.hint" :help="field.help">

          <component :is="getFieldComponent(field.type)" v-model="formData[field.name]" size="xl" :variant="variant"
            :placeholder="field.placeholder || `Enter ${field.label}`" :chip="field.chip || false" v-bind="field"
            :loading="loading" :disabled="disabled" loading-icon="i-lucide-loader" :class="field.class || 'w-full'">

            <template v-if="formData[field.name] && field.clearable" #trailing>
              <UButton color="neutral" variant="link" size="sm" icon="i-lucide-circle-x" aria-label="Clear input"
                @click="formData[field.name] = ''" />
            </template>

            <template v-if="field.maxLength" #trailing>
              <div id="character-count" class="text-xs text-muted tabular-nums" aria-live="polite" role="status">
                {{ formData[field.name]?.length }}/{{ field.maxLength }}
              </div>
            </template>
          </component>

          <!-- <template v-if="field.regex && !field.regex.test(formData[field.name])" #error>
          {{ field.errorMessage }}
        </template> -->
        </UFormField>
      </div>

      <slot name="after" />

    </div>
    <button v-if="props.showSubmitButton" :disabled="!isFormValid" @click="onSubmit"
      class="flex items-center justify-center gap-2 w-full my-4 bg-primary text-white font-semibold rounded-md px-4 py-2 dark:text-white text-center">
      <Icon name="i-heroicons-arrow-right-circle-solid" size="24" />
      {{ submitLabel }}
    </button>
  </div>
</template>
