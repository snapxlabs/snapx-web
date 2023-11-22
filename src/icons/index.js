import SvgIcon from '@/components/SvgIcon' // svg component

export default app => {
  app.component('SvgIcon', SvgIcon)
  import.meta.glob('./svg/*.svg', { eager: true })
}
