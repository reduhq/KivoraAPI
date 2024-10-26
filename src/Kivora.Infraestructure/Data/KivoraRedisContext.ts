import settings from '@Kivora.Infraestructure/Settings'
import { Redis } from '@upstash/redis'

export const redis = new Redis({
    url: 'https://kind-crayfish-45812.upstash.io',
    token: settings.REDIS_TOKEN
})
