<script lang="ts">
	import { buildImageUrl } from '$lib/utils/cloudinary';

	// Using the simplest sample image path
	const testImageUrl = buildImageUrl('samples/smile', {});

	console.log('Generated URL:', testImageUrl); // Let's see what URL we're generating
</script>

<img src={testImageUrl} alt="Test image" />
