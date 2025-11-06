<script>
	import { m } from '$lib/paraglide/messages';
	import { env } from '$env/dynamic/public';
</script>

<footer class="footer-center footer footer-horizontal rounded bg-transparent p-10 text-base-content">
	<aside>
		<p>Copyright © {new Date().getFullYear()} - All right reserved</p>
		<a href="mailto:birenchens@163.com">{m.contact_us()}: birenchens@163.com</a>
		<p>
			<a class="link" href="https://beian.miit.gov.cn/" target="_blank">{env.PUBLIC_BEIAN_NUMBER}</a
			>
		</p>
	</aside>
</footer>
