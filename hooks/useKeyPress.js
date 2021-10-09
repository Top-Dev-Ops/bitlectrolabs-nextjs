import { useEffect } from 'react'

export default function useKeyPress(key, actionUp, actionDown) {
    useEffect(() => {
        function onKeyUp(e) {
            if (e.key === key) {
                actionUp()
            }
        }

        function onKeyDown(e) {
            if (e.key === key) {
                actionDown()
            }
        }

        window.addEventListener('keyup', onKeyUp)
        window.addEventListener('keydown', onKeyDown)

        return () => {
            window.removeEventListener('keyup', onKeyUp)
            window.removeEventListener('keydown', onKeyDown)
        }
    })
}