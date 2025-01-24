export async function compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const MAX_WIDTH = 1920;
                const MAX_HEIGHT = 1080;
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(compressedFile);
                        } else {
                            reject(new Error('Compression failed'));
                        }
                    },
                    'image/jpeg',
                    0.7
                );
            };
        };
        reader.onerror = (error) => reject(error);
    });
}

export type LicenseSide = 'front' | 'back';

export interface FormData {
    licenseFrontImage: File | null;
    licenseBackImage: File | null;
    [key: string]: any;
}

export interface FormErrors {
    licenseFrontImage: string;
    licenseBackImage: string;
    [key: string]: string;
}

export async function handleFileUpload(
    event: Event, 
    side: LicenseSide, 
    formData: FormData, 
    errors: FormErrors
): Promise<void> {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    
    if (files && files[0]) {
        try {
            const compressedFile = await compressImage(files[0]);
            if (side === 'front') {
                formData.licenseFrontImage = compressedFile;
                errors.licenseFrontImage = '';
            } else {
                formData.licenseBackImage = compressedFile;
                errors.licenseBackImage = '';
            }
        } catch (error) {
            if (side === 'front') {
                errors.licenseFrontImage = 'Error processing image';
            } else {
                errors.licenseBackImage = 'Error processing image';
            }
        }
    }
} 