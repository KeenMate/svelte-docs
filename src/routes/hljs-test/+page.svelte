<script lang="ts">
	import hljs from 'highlight.js';
	import { onMount } from 'svelte';

	let testResults = $state<Array<{
		input: string;
		output: string;
		type: string;
		hasLeadingNewline: boolean;
		hasTrailingNewline: boolean;
		length: number;
		originalLength: number;
	}>>([]);

	onMount(() => {
		// Test cases for different code inputs
		const testCases = [
			{ code: 'console.log("hello");', desc: 'Simple JS' },
			{ code: '\nconsole.log("hello");', desc: 'Leading newline' },
			{ code: 'console.log("hello");\n', desc: 'Trailing newline' },
			{ code: '\nconsole.log("hello");\n', desc: 'Both newlines' },
			{ code: '  console.log("hello");  ', desc: 'Leading/trailing spaces' },
			{ code: '\n  console.log("hello");  \n', desc: 'Mixed whitespace' },
			{ code: 'function test() {\n  return true;\n}', desc: 'Multi-line' },
			{ code: '\nfunction test() {\n  return true;\n}\n', desc: 'Multi-line with newlines' }
		];

		testResults = testCases.map(testCase => {
			// Test auto-detect
			const autoResult = hljs.highlightAuto(testCase.code);

			// Test specific language
			const jsResult = hljs.highlight(testCase.code, { language: 'javascript' });

			const analyzeResult = (result: any, type: string) => ({
				input: JSON.stringify(testCase.code),
				output: JSON.stringify(result.value),
				type: `${testCase.desc} (${type})`,
				hasLeadingNewline: result.value.startsWith('\n'),
				hasTrailingNewline: result.value.endsWith('\n'),
				length: result.value.length,
				originalLength: testCase.code.length
			});

			return [
				analyzeResult(autoResult, 'auto'),
				analyzeResult(jsResult, 'js')
			];
		}).flat();
	});
</script>

<div class="container py-4">
	<h1>Highlight.js Whitespace Test</h1>

	<div class="table-responsive">
		<table class="table table-striped">
			<thead>
				<tr>
					<th>Test Case</th>
					<th>Input</th>
					<th>Output</th>
					<th>Leading \n</th>
					<th>Trailing \n</th>
					<th>Length Change</th>
				</tr>
			</thead>
			<tbody>
				{#each testResults as result}
					<tr>
						<td>{result.type}</td>
						<td><code>{result.input}</code></td>
						<td><code>{result.output}</code></td>
						<td class={result.hasLeadingNewline ? 'text-danger' : 'text-success'}>
							{result.hasLeadingNewline ? 'YES' : 'NO'}
						</td>
						<td class={result.hasTrailingNewline ? 'text-danger' : 'text-success'}>
							{result.hasTrailingNewline ? 'YES' : 'NO'}
						</td>
						<td class={result.length !== result.originalLength ? 'text-warning' : 'text-success'}>
							{result.originalLength} → {result.length}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<div class="alert alert-info mt-4">
		<h5>Co testujeme:</h5>
		<ul>
			<li><strong>Leading \n:</strong> Má výstup newline na začátku?</li>
			<li><strong>Trailing \n:</strong> Má výstup newline na konci?</li>
			<li><strong>Length Change:</strong> Změnila se délka stringu?</li>
		</ul>
		<p><strong>Červená</strong> = Problematické (přidává whitespace)<br>
		<strong>Zelená</strong> = OK<br>
		<strong>Oranžová</strong> = Změna délky</p>
	</div>
</div>

<style>
	.table code {
		background-color: #f8f9fa;
		padding: 0.2rem 0.4rem;
		border-radius: 0.25rem;
		font-size: 0.875em;
		max-width: 300px;
		display: inline-block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>