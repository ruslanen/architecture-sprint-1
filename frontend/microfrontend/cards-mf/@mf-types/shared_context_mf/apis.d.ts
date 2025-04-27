
    export type RemoteKeys = 'shared_context_mf/PopupWithForm' | 'shared_context_mf/CurrentUserContext';
    type PackageType<T> = T extends 'shared_context_mf/CurrentUserContext' ? typeof import('shared_context_mf/CurrentUserContext') :T extends 'shared_context_mf/PopupWithForm' ? typeof import('shared_context_mf/PopupWithForm') :any;