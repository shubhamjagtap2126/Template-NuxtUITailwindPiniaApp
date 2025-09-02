<template>
  <div class="dynamic-form-container">
    <UForm ref="formRef" :state="formData" :schema="formSchema" @submit="onSubmit" class="space-y-6">
      <!-- Before slot for custom content -->
      <slot name="before" />

      <!-- Dynamic form fields -->
      <div v-for="(field, index) in formFields" :key="field.name || index" class="form-field-wrapper" :class="field.wrapperClass">
        <!-- Text Input Fields -->
        <UFormGroup
          v-if="['text', 'email', 'password', 'url', 'tel'].includes(field.type)"
          :label="field.label"
          :description="field.description"
          :help="field.help"
          :error="field.error"
          :required="field.required"
          :name="field.name"
        >
          <UInput
            v-model="formData[field.name]"
            :type="field.type"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :readonly="field.readonly"
            :icon="field.icon"
            :trailing-icon="field.trailingIcon"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
            :loading="field.loading"
            :autocomplete="field.autocomplete"
          />
        </UFormGroup>

        <!-- Number Input -->
        <UFormGroup v-else-if="field.type === 'number'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UInput
            v-model="formData[field.name]"
            type="number"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :readonly="field.readonly"
            :min="field.min"
            :max="field.max"
            :step="field.step"
            :icon="field.icon"
            :trailing-icon="field.trailingIcon"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
          />
        </UFormGroup>

        <!-- Textarea -->
        <UFormGroup v-else-if="field.type === 'textarea'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UTextarea
            v-model="formData[field.name]"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :readonly="field.readonly"
            :rows="field.rows || 4"
            :maxrows="field.maxRows"
            :resize="field.resize !== false"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
          />
        </UFormGroup>

        <!-- Select Dropdown -->
        <UFormGroup v-else-if="field.type === 'select'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <USelect
            v-model="formData[field.name]"
            :options="field.options || []"
            :placeholder="field.placeholder"
            :disabled="field.disabled"
            :loading="field.loading"
            :searchable="field.searchable"
            :multiple="field.multiple"
            :clearable="field.clearable"
            :value-attribute="field.valueAttribute || 'value'"
            :option-attribute="field.optionAttribute || 'label'"
            :icon="field.icon"
            :trailing-icon="field.trailingIcon"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
          />
        </UFormGroup>

        <!-- Date Input -->
        <UFormGroup v-else-if="field.type === 'date'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UInput
            v-model="formData[field.name]"
            type="date"
            :disabled="field.disabled"
            :readonly="field.readonly"
            :min="field.min"
            :max="field.max"
            :icon="field.icon"
            :trailing-icon="field.trailingIcon"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
          />
        </UFormGroup>

        <!-- Time Input -->
        <UFormGroup v-else-if="field.type === 'time'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UInput
            v-model="formData[field.name]"
            type="time"
            :disabled="field.disabled"
            :readonly="field.readonly"
            :icon="field.icon"
            :trailing-icon="field.trailingIcon"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
          />
        </UFormGroup>

        <!-- File Upload -->
        <UFormGroup v-else-if="field.type === 'file'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UInput
            type="file"
            :multiple="field.multiple"
            :accept="field.accept"
            :disabled="field.disabled"
            :color="field.color"
            :variant="field.variant"
            :size="field.size || 'lg'"
            @change="handleFileChange($event, field)"
          />
          <div v-if="getFilePreview(field.name)" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">Selected: </span>
            {{ getFilePreview(field.name) }}
          </div>
        </UFormGroup>

        <!-- Checkbox Group -->
        <UFormGroup v-else-if="field.type === 'checkbox'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <UCheckbox
              v-for="option in field.options"
              :key="option[field.valueAttribute || 'value']"
              v-model="formData[field.name]"
              :value="option[field.valueAttribute || 'value']"
              :label="option[field.optionAttribute || 'label']"
              :disabled="field.disabled || option.disabled"
              :color="field.color"
              :size="field.size"
            />
          </div>
        </UFormGroup>

        <!-- Radio Group -->
        <UFormGroup v-else-if="field.type === 'radio'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <URadioGroup
            v-model="formData[field.name]"
            :options="field.options"
            :value-attribute="field.valueAttribute || 'value'"
            :option-attribute="field.optionAttribute || 'label'"
            :disabled="field.disabled"
            :color="field.color"
            :size="field.size"
          />
        </UFormGroup>

        <!-- Toggle Switch -->
        <UFormGroup v-else-if="field.type === 'toggle'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <UToggle v-model="formData[field.name]" :disabled="field.disabled" :color="field.color" :size="field.size || 'lg'" />
        </UFormGroup>

        <!-- Range Slider -->
        <UFormGroup v-else-if="field.type === 'range'" :label="field.label" :description="field.description" :help="field.help" :error="field.error" :required="field.required" :name="field.name">
          <URange v-model="formData[field.name]" :min="field.min || 0" :max="field.max || 100" :step="field.step || 1" :disabled="field.disabled" :color="field.color" :size="field.size || 'lg'" />
          <div class="flex justify-between text-sm text-gray-500 mt-1">
            <span>{{ field.min || 0 }}</span>
            <span class="font-medium">{{ formData[field.name] }}</span>
            <span>{{ field.max || 100 }}</span>
          </div>
        </UFormGroup>
      </div>

      <!-- After slot for custom content -->
      <slot name="after" />

      <!-- Submit Button -->
      <div v-if="showSubmitButton" class="flex justify-end gap-3 pt-4">
        <UButton v-if="showResetButton" type="button" color="gray" variant="outline" :size="buttonSize" :loading="isResetting" @click="resetForm">
          <template #leading>
            <UIcon name="i-lucide-rotate-ccw" />
          </template>
          {{ resetLabel }}
        </UButton>

        <UButton type="submit" :color="submitColor" :variant="submitVariant" :size="buttonSize" :loading="isSubmitting" :disabled="isFormInvalid">
          <template #leading>
            <UIcon :name="submitIcon" />
          </template>
          {{ submitLabel }}
        </UButton>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { reactive, computed, watch, ref, onMounted } from 'vue';
import { z } from 'zod';

// --- Props and Emits ---
const props = defineProps({
  formFields: {
    type: Array,
    required: true,
    default: () => [],
    validator: (fields) => {
      return Array.isArray(fields) && fields.every((field) => field.name && field.type);
    },
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  submitLabel: {
    type: String,
    default: 'Submit',
  },
  resetLabel: {
    type: String,
    default: 'Reset',
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  showResetButton: {
    type: Boolean,
    default: false,
  },
  submitColor: {
    type: String,
    default: 'primary',
  },
  submitVariant: {
    type: String,
    default: 'solid',
  },
  submitIcon: {
    type: String,
    default: 'i-lucide-send',
  },
  buttonSize: {
    type: String,
    default: 'lg',
  },
  enableAnimations: {
    type: Boolean,
    default: true,
  },
  validationSchema: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['submit', 'update:modelValue', 'reset', 'fieldChange', 'validate']);

// --- Refs ---
const formRef = ref();
const isSubmitting = ref(false);
const isResetting = ref(false);
const { animateFormFields } = useGsapAnimations();

// --- Reactive Form Data ---
const formData = reactive({});

// --- Initialize Form Data ---
const initializeFormData = () => {
  // Clear existing data
  Object.keys(formData).forEach((key) => {
    delete formData[key];
  });

  // Set initial values from modelValue
  Object.assign(formData, props.modelValue);

  // Initialize field defaults
  props.formFields.forEach((field) => {
    if (formData[field.name] === undefined) {
      switch (field.type) {
        case 'checkbox':
          formData[field.name] = field.multiple ? [] : false;
          break;
        case 'radio':
          formData[field.name] = field.defaultValue || null;
          break;
        case 'toggle':
          formData[field.name] = field.defaultValue || false;
          break;
        case 'range':
          formData[field.name] = field.defaultValue || field.min || 0;
          break;
        case 'number':
          formData[field.name] = field.defaultValue || null;
          break;
        case 'file':
          formData[field.name] = field.multiple ? [] : null;
          break;
        default:
          formData[field.name] = field.defaultValue || '';
      }
    }
  });
};

// --- Watchers ---
watch(
  () => props.modelValue,
  () => initializeFormData(),
  { immediate: true, deep: true }
);

watch(
  formData,
  (newValue) => {
    emit('update:modelValue', { ...newValue });
  },
  { deep: true }
);

// --- Validation Schema ---
const formSchema = computed(() => {
  if (props.validationSchema) {
    return props.validationSchema;
  }

  const schema = {};

  props.formFields.forEach((field) => {
    let fieldSchema;

    switch (field.type) {
      case 'email':
        fieldSchema = z.string().email('Please enter a valid email');
        break;
      case 'number':
        fieldSchema = z.number();
        if (field.min !== undefined) fieldSchema = fieldSchema.min(field.min);
        if (field.max !== undefined) fieldSchema = fieldSchema.max(field.max);
        break;
      case 'url':
        fieldSchema = z.string().url('Please enter a valid URL');
        break;
      case 'tel':
        fieldSchema = z.string().regex(/^[+]?[0-9\s\-\(\)]+$/, 'Please enter a valid phone number');
        break;
      case 'checkbox':
        fieldSchema = field.multiple ? z.array(z.any()) : z.boolean();
        break;
      case 'file':
        fieldSchema = field.multiple ? z.array(z.any()) : z.any().nullable();
        break;
      default:
        fieldSchema = z.string();
    }

    if (field.required && field.type !== 'toggle') {
      if (field.type === 'checkbox' && field.multiple) {
        fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`);
      } else if (field.type === 'file') {
        fieldSchema = fieldSchema.refine((val) => val !== null && val !== undefined, {
          message: `${field.label || field.name} is required`,
        });
      } else {
        fieldSchema = fieldSchema.min(1, `${field.label || field.name} is required`);
      }
    } else if (!field.required) {
      fieldSchema = fieldSchema.optional();
    }

    if (field.regex) {
      fieldSchema = fieldSchema.regex(new RegExp(field.regex), field.errorMessage || 'Invalid format');
    }

    schema[field.name] = fieldSchema;
  });

  return z.object(schema);
});

// --- Form Validation ---
const isFormInvalid = computed(() => {
  try {
    formSchema.value.parse(formData);
    return false;
  } catch {
    return true;
  }
});

// --- File Handling ---
const handleFileChange = (event, field) => {
  const files = Array.from(event.target.files || []);

  if (field.maxSize) {
    const invalidFiles = files.filter((file) => file.size > field.maxSize);
    if (invalidFiles.length > 0) {
      const toast = useToast();
      toast.add({
        title: 'File Size Error',
        description: `File size must be less than ${(field.maxSize / 1024 / 1024).toFixed(1)}MB`,
        color: 'red',
      });
      return;
    }
  }

  if (field.multiple) {
    formData[field.name] = files;
  } else {
    formData[field.name] = files[0] || null;
  }

  emit('fieldChange', { field: field.name, value: formData[field.name] });
};

const getFilePreview = (fieldName) => {
  const files = formData[fieldName];
  if (!files) return null;

  if (Array.isArray(files)) {
    return files.map((f) => f.name).join(', ');
  }

  return files.name || 'Unknown file';
};

// --- Form Actions ---
const onSubmit = async (event) => {
  isSubmitting.value = true;

  try {
    const validatedData = formSchema.value.parse(formData);
    emit('submit', {
      data: validatedData,
      event,
      formData: { ...formData },
    });
  } catch (error) {
    const toast = useToast();
    toast.add({
      title: 'Validation Error',
      description: 'Please check your form data',
      color: 'red',
    });

    emit('validate', { valid: false, errors: error.errors });
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  isResetting.value = true;

  // Reset to initial values
  Object.keys(formData).forEach((key) => {
    const field = props.formFields.find((f) => f.name === key);
    if (field) {
      switch (field.type) {
        case 'checkbox':
          formData[key] = field.multiple ? [] : false;
          break;
        case 'toggle':
          formData[key] = false;
          break;
        case 'file':
          formData[key] = field.multiple ? [] : null;
          break;
        default:
          formData[key] = '';
      }
    }
  });

  emit('reset', { ...formData });

  setTimeout(() => {
    isResetting.value = false;
  }, 300);
};

// --- Lifecycle ---
onMounted(() => {
  if (props.enableAnimations) {
    nextTick(() => {
      animateFormFields('.form-field-wrapper');
    });
  }
});
</script>

<style scoped>
.form-field-wrapper {
  opacity: 0;
  transform: translateX(-30px);
}

.dynamic-form-container {
  @apply w-full max-w-none;
}

/* Custom styling for better visual appeal */
.form-field-wrapper:hover {
  @apply transition-all duration-200;
}
</style>
