<script lang="ts">
	import { buildImageUrl } from '$lib/utils/cloudinary';

	// Example usage with a public ID
	const imageUrl = buildImageUrl('your-folder/image-public-id', {
		width: 500, // optional transformations
		height: 300,
		crop: 'fill'
	});
</script>

<img src={imageUrl} alt="Your image description" />
