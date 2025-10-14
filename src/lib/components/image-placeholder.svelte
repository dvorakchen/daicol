<div class="stack w-full md:w-7/12">
	<div class="card bg-base-100">
		<div class="image bg-base-200"></div>
	</div>
</div>

<style>
	.stack {
		max-width: 400px;
		transition: 0.25s ease;
		&:hover {
			transform: rotate(5deg);
			.card:before {
				transform: translatey(-2%) rotate(-4deg);
			}
			.card:after {
				transform: translatey(2%) rotate(4deg);
			}
		}
	}

	.card {
		aspect-ratio: 3 / 2;
		border: 4px solid;
		/* background-color: #fff; */
		position: relative;
		transition: 0.15s ease;
		padding: 5% 5% 15% 5%;
		&:before,
		&:after {
			content: '';
			display: block;
			position: absolute;
			height: 100%;
			width: 100%;
			border: 4px solid;
			/* background-color: #fff; */
			transform-origin: center center;
			z-index: -1;
			transition: 0.15s ease;
			top: 0;
			left: 0;
		}

		&:before {
			transform: translatey(-2%) rotate(-6deg);
		}

		&:after {
			transform: translatey(2%) rotate(6deg);
		}
	}
	.image {
		width: 100%;
		border: 4px solid;
		/* background-color: #eee; */
		aspect-ratio: 1 / 1;
		position: relative;
	}
</style>
