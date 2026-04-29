<script>
    import { goto } from '$app/navigation';
    import { Tooltip, Button } from "flowbite-svelte";
    import { totalPoints, storyPoints} from '../../lib/stores.js';
    let cells = $state([
        ["🏛️", "🪨🌱🟢", "🌳", "🪜"],
        ["⑂🪵", "👨‍👩‍👧‍👦", "🌿", "🎒"]
    ]);

    let answer = $state(["👨‍👩‍👧‍👦", "🏛️", "🎒", "🌳", "⑂🪵", "🪨🌱🟢", "🪜", "🌿"]);

    let sentenceWords = $state(Array(8).fill(""));
    let selected = $state({ type: null, row: null, col: null });
    let history = $state([]); 

    function handleCellClick(type, row, col) {
        // If clicking a main cell, always update selection if it's not empty
        if (type === 'main') {
            if (cells[row][col] !== "") {
                selected = { type, row, col };
            }
        } 
        // If clicking a sentence slot, perform the move only if something is selected
        else if (type === 'sentence' && selected.type === 'main') {
            const slotIndex = row;
            
            // Only move to empty slots
            if (sentenceWords[slotIndex] !== "") return;

            // Record for undo
            history.push({
                from: { ...selected },
                to: slotIndex,
                val: cells[selected.row][selected.col]
            });

            // Execute move
            sentenceWords[slotIndex] = cells[selected.row][selected.col];
            cells[selected.row][selected.col] = "";

            // Reset selection after placement
            selected = { type: null, row: null, col: null };
        }
    }

    function undo() {
        if (history.length === 0) return;
        
        let lastMove = history.pop();
        
        cells[lastMove.from.row][lastMove.from.col] = lastMove.val;
        sentenceWords[lastMove.to] = "";
        
        selected = { type: null, row: null, col: null };
    }

    
    // ...existing code...

    function handleClick() {
        if (confirm("Are you sure you want to submit your answers?")) {
            //Points - award 1 point for each correct story slot (8 points max)
            for (let i = 0; i < answer.length; i++) {
                if (sentenceWords[i] === answer[i]) {
                    storyPoints.update(n => n + 1);
                    totalPoints.update(n => n + 1);
                }
            }
            console.log("Total Points (Puzzle + Story): " + $totalPoints);
            goto('/share');
        }
       
    }

    let sentenceParts = $state([
        { type: 'text', content: "The adventurous " }, { type: 'slot', id: 0 },
        { type: 'text', content: " finally reached the ancient jungle " }, { type: 'slot', id: 1 },
        { type: 'text', content: ", their " }, { type: 'slot', id: 2 },
        { type: 'text', content: " bouncing with every step. A gigantic " }, { type: 'slot', id: 3 },
        { type: 'text', content: " had completely enveloped one side, its powerful " }, { type: 'slot', id: 4 },
        { type: 'text', content: " snaking down the stone walls. Emerald green " }, { type: 'slot', id: 5 },
        { type: 'text', content: " clung to every surface, making the eroded " }, { type: 'slot', id: 6 },
        { type: 'text', content: " treacherous. One explorer’s backpack snagged on a thick hanging " }, { type: 'slot', id: 7 },
        { type: 'text', content: ", nearly sending him tumbling!" }
    ]);
</script>

<main>
    <link rel="stylesheet" href="../src/public/styles.css">
    <div class="container">
        <div class="border">
        
         <div class = "top-border frame-bar">
         <div class="header-left">
          <a href="/" class="home-link">
            <img src="../src/lib/assets/favicon.svg" alt="Home"/>
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
          <div class = "inner-border-split">
            <div class="split">
                <table class="lr">
                    <tbody>
                        {#each cells as row, r}
                            <tr>
                                {#each row as val, c}
                                    <td class:selected={selected.type==='main' && selected.row===r && selected.col===c}
                                        onclick={() => handleCellClick('main', r, c)}>{val}</td>
                                {/each}
                            </tr>
                        {/each}
                    </tbody>
                </table>

                <div class="sentence">
                    {#each sentenceParts as part}
                        {#if part.type === 'text'} {part.content}
                        {:else}
                            <!-- svelte-ignore a11y_click_events_have_key_events -->
                            <!-- svelte-ignore a11y_no_static_element_interactions -->
                            <span class="sentenceSlot" 
                                  class:selected={selected.type === 'sentence' && selected.row === part.id}
                                  onclick={() => handleCellClick('sentence', part.id)}>
                                {sentenceWords[part.id] || "____"}
                            </span>
                        {/if}
                    {/each}
                </div>
            </div>
            
            <div class="center" id = "root">
                <br><br><br><br>
                <button onclick={handleClick} class="btn-group">Enter</button>
                <button onclick={undo} class="btn-group">Undo</button>
            </div>
          </div>
          <footer class="footer"> <p>© 2026 Gist | <a href="/terms">Terms</a></p> </footer>
        </div>
    </div>
</main>