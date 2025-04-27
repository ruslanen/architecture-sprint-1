
    export type RemoteKeys = 'shared_context/PopupWithForm' | 'shared_context/CurrentUserContext';
    type PackageType<T> = T extends 'shared_context/CurrentUserContext' ? typeof import('shared_context/CurrentUserContext') :T extends 'shared_context/PopupWithForm' ? typeof import('shared_context/PopupWithForm') :any;