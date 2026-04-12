<script setup>
import { ref, reactive } from 'vue'
// useHead({ title: 'Home' })
// const count = ref(0)
// defineProps({ msg: String })
// const signFormValues = reactive({ })
// const onSubmit = (values) => { console.log('Submit': ); }
// const onReset = () => { console.log('onRecet'); }
const route = useRoute()
const open = ref(false);
const resCard = ref(false);
const response = ref({})
const form = reactive({})
const supportQuestions = [
  {
    name: 'issue',
    label: 'Issue Type',
    type: 'select',
    placeholder: "Select Issue Type",
    items: [],
    errorMessage: 'Please select an issue type',
    required: true,
    icon: 'line-md:phone-call-loop',
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: "Describe your issue in detail",
    errorMessage: 'Please enter a description',
    required: true,
    icon: 'line-md:phone-call-loop',
  },

]
// add Route based issue items, Parenting, Quiz, Explore, Profile
watch(() => route.path, (newVal) => {
  // console.log(newVal)
  supportQuestions[0].items = []
  switch (true) {
    case newVal.includes('/quiz'):
      supportQuestions[0].items.push(['Quiz Issue', 'Quiz not loading', 'Quiz not starting', 'Quiz not ending', 'Quiz not sharing', 'Quiz not liking', 'Other'])
      break;
    case newVal.includes('/parenting'):
      supportQuestions[0].items.push(['Parenting Issue', 'Parenting not loading', 'Parenting not starting', 'Parenting not ending', 'Parenting not sharing', 'Parenting not liking', 'Other'])
      break;
    case newVal.includes('/explore'):
      supportQuestions[0].items.push(['Explore Issue', 'Explore not loading', 'Explore not starting', 'Explore not ending', 'Explore not sharing', 'Explore not liking', 'Other'])
      break;
    case newVal.includes('/profile'):
      supportQuestions[0].items.push(['Profile Issue', 'Profile not loading', 'Profile not sharing', 'Profile not liking', 'Other'])
      break;
    default:
      supportQuestions[0].items.push(['General Inquiry', 'Technical Issue', 'Billing Issue', 'Other']);
  }
}, { immediate: true })

const onSubmit = async (values) => {
  let user = {}
  if (useAuthStore()?.user) {
    const { contact, _id, name, email, role, ...rest } = useAuthStore()?.user;
    user = { contact, _id, name, email, role }
  }
  const data = Object.assign(form, values, { ...user, route: route.path });
  let res = await $fetch('/api/mongocrud', {
    method: 'POST',
    body: { model: 'Support', postData: data, method: 'POST' },
  });
  response.value = decryptPayload(res)
  if (!response.value.error) {
    open.value = false;
    useToast().add({
      title: 'Success',
      description: 'Support request submitted successfully',
      color: 'success',
      duration: 5000,
    })
    // make form empty
    Object.keys(form).forEach(key => form[key] = null)
    resCard.value = true
  } else {
    useToast().add({
      title: 'Error',
      description: 'Failed to submit support request',
      color: 'error',
      duration: 5000,
    })
  }
}
</script>

<template>
  <ClientOnly>
    <UButton @click="open = true" color="neutral" variant="solid" size="lg"
      class="fixed z-50 bottom-24 right-6 md:bottom-6 md:right-6 rounded-full px-2 shadow-lg shadow-blue-500/20">
      <Icon name="fluent:info-sparkle-32-regular" class="text-base shrink-0 w-10 h-10 md:w-5 md:h-5" /> <span
        class="hidden md:block">Help &
        Support</span>
    </UButton>
    <template>
      <UDrawer title="Feedback, Help & Support" direction="right" v-model:open="open">
        <template #description>
          <p class="text-sm text-gray-500 dark:text-gray-400 max-w-md">
            Share your feedback, report issues, or get assistance with any questions you may have.
          </p>
        </template>

        <template #body>
          <DynamicForm :form-fields="supportQuestions" :bind-values="form" :submit-label="'Submit'"
            :show-submit-button="true" @submit="onSubmit" />
        </template>
      </UDrawer>
    </template>

    <UModal v-model:open="resCard" :title="`Support Request ID - ${response?._id}`"
      description="Request Registered Successfully!">
      <template #body>

        <!-- show all the info with beautiful card -->
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-check-circle" class="text-green-500 text-2xl" />
            <h2 class="text-2xl font-bold">Support Request Submitted</h2>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-400">Your support request has been submitted successfully. We will
              get
              back to you as soon as possible.</p>
          </div>
          <!-- Info about Issue Description -->
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-info" class="text-green-500 text-2xl" />
            <h2 class="text-2xl font-bold">Issue Details</h2>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-400">{{ response?.issue }}</p>
            <p class="text-gray-500 dark:text-gray-400">{{ response?.description }}</p>
          </div>
          <!-- Created At -->
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-calendar" class="text-green-500 text-2xl" />
            <h2 class="text-2xl font-bold">Created At</h2>
          </div>
          <div class="flex flex-col gap-2">
            <p class="text-gray-500 dark:text-gray-400">{{ new Date(response?.createdAt).toLocaleString() }}</p>
          </div>
        </div>
      </template>
    </UModal>
  </ClientOnly>
</template>


<style scoped></style>
