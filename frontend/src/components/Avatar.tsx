type AvatarProps = {
  src: string;
  alt: string;
  size?: 'md' | 'sm';
};

const Avatar = ({ src, alt, size }: AvatarProps) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover rounded ${size === 'md' ? 'w-12 h-12' : 'w-8 h-8'}`}
    />
  );
};

export default Avatar;
