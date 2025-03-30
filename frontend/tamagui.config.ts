import { createTamagui, getConfig } from '@tamagui/core'
import { defaultConfig } from '@tamagui/config/v4';


export const config = createTamagui(defaultConfig)
 
// get typescript types on @tamagui/core imports:
type AppConfig = typeof config
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends AppConfig {}
}