import { Environments } from '~/lib/values/general.values';

export default function useIsProd() {
  const config = useRuntimeConfig();

  return {
    isProd: computed(() => config.public.ENV === Environments.prod),
  };
}
