<script>
  import { Clipboard, Button, Tooltip } from "flowbite-svelte";
  import { CheckOutline, ClipboardCleanSolid } from "flowbite-svelte-icons";
  import { totalPoints } from '../../lib/stores.js';
  import CongratsCard from '$lib/components/congrats.svelte';
  import StandardCard from '$lib/components/card.svelte';
  import { onMount } from 'svelte';
  let mounted = $state(false);

  onMount(() => {
    mounted = true;
  });
  // 1. Reactive state for the winner status
  let isWinner = $derived($totalPoints >= 16);

  // 2. Reactive variable to hold the text content for the clipboard
  // We use $effect to update this whenever isWinner changes
  let cardContentRef; // Add this reference
  let copyText = $state("");
  
  $effect(() => {
    // You might need a reference or a specific selector here
    const content = document.getElementById('card-content')?.innerText || "";
    copyText = content;
  });
</script>

<main>
  <div class="container">
    <div class="border">
      
       <div class = "top-border frame-bar">
         <div class="header-left">
          <a href="/" class="home-link">
            <img src="/favicon.svg" alt="Home" width = "200"/>
          </a>
          </div>
          <div class="header-right">
          <Button id="info">ⓘ</Button>
          <Tooltip triggeredBy="#info" placement="bottom" strategy="fixed" class="minimal-tooltip">
            <div class="tooltip-container">
              <div class="tooltip-header">How to Play</div>
              
              <div class="step">
                <span class="step-label">Part 1: Riddles</span>
                <p>Sort the correct icon into the slot to claim your clue.</p>
              </div>
              
              <div class="step">
                <span class="step-label">Part 2: Rebus</span>
                <p>Sort 16 icons to form phonetic sounds, like "Backpack" (Back + Paw + Key + Pack).</p>
              </div>
              
              <div class="step">
                <span class="step-label">Part 3: Mad Libs</span>
                <p>Complete the story sequence using the icons you collected.</p>
              </div>
            </div>
          </Tooltip>
         <Button class="btn-group" id = "leaderboard">🜲</Button>
         <Tooltip triggeredBy="#leaderboard" placement="bottom" strategy="fixed" class="minimal-tooltip"> 
            <div class="tooltip-container">
              <div class="tooltip-header">Leaderboard</div>
              <div class="step">
                <span class="step-label">Coming Soon</span>
              </div>
            </div>
          </Tooltip>
          </div>
        </div>
     
          
          

     <div id="card-content" bind:this={cardContentRef}>
          {#if isWinner}
            <CongratsCard />
          {:else}
            <StandardCard />
          {/if}
  
        <div id="clipboard">
          <Clipboard 
            bind:value={copyText} 
            color="alternative" 
            size="xs" 
           
          >
            {#snippet children(success)}
              {#if success}
                <CheckOutline/> Copied!
              {:else}
                <ClipboardCleanSolid  />
              {/if}
            {/snippet}
          </Clipboard>
        </div>
    </div>

    <div class = "center"> Your feedback can improve Gist! <a> https://forms.gle/f9MGyLDkzDfZvmqv8 </a> </div>

      

      <footer class="footer"> <p>© 2026 Gist | <a href="/terms">Terms</a></p> </footer>
    </div>
  </div>
</main>
