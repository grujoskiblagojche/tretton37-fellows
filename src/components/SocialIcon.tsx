export type IconProps = {
  url: string
  imgSrc: string
  alt: string
}

const SocialIcon = (props: IconProps): JSX.Element => (
  <a
    href={props.url}
    rel="noreferrer"
    target="_blank"
    className="flex justify-center items-center w-6 md:w-8 h-6 md:h-8 m-1 rounded-md bg-white hover:bg-slate-100 border border-gray-300 ml-1 p-1"
  >
    <img src={props.imgSrc} alt={props.alt} className="flex w-4 h-4" />
  </a>
)

export default SocialIcon
