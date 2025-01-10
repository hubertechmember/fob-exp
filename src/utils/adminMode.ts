import { SceneConfig } from '@/types/scenes';

export const enableAdminMode = (scenes: SceneConfig[]): SceneConfig[] => {
  return scenes.map(scene => ({
    ...scene,
    locked: false
  }));
};

export const ADMIN_KONAMI = 'admin';
