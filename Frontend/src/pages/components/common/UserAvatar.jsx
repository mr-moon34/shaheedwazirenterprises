// import PropTypes from 'prop-types';

const UserAvatar = ({ name, size = 'md', className = '' }) => {
  // Extract initials from name
  const getInitials = (fullName) => {
    if (!fullName) return '?';
    
    const names = fullName.split(' ');
    let initials = names[0].substring(0, 1).toUpperCase();
    
    if (names.length > 1) {
      initials += names[names.length - 1].substring(0, 1).toUpperCase();
    }
    
    return initials;
  };

  // Size classes
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm',
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-14 w-14 text-xl'
  };

  // Background colors based on name hash for consistency
  const colors = [
    'bg-indigo-500',
    'bg-pink-500',
    'bg-purple-500',
    'bg-teal-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-rose-500'
  ];

  // Simple hash function to get consistent color for a name
  const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % colors.length;
  };

  const colorClass = colors[simpleHash(name || '')];

  return (
    <div
      className={`${sizeClasses[size]} ${colorClass} rounded-full flex items-center justify-center text-white font-medium ${className}`}
      title={name}
    >
      {getInitials(name)}
    </div>
  );
};


export default UserAvatar;