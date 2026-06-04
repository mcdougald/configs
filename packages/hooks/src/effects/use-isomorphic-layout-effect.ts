import { useEffect, useLayoutEffect } from 'react'

export default globalThis.window === undefined ? useEffect : useLayoutEffect
